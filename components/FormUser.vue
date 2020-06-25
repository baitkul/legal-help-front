<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="modal-card-title">{{ title }}</div>
    </header>

    <section class="modal-card-body">
      <b-form ref="form" #default="{ errors }" :model="model" :rules="rules">
        <b-field
          v-if="createMode"
          :type="{'is-danger': errors.email}"
          label="Эл. почта"
          :message="errors.email"
        >
          <b-input v-model="model.email"></b-input>
        </b-field>

        <b-field
          v-if="model.role === 'CLIENT'"
          :type="{'is-danger': errors.phone}"
          label="Номер телефона"
          :message="errors.phone"
        >
          <div class="control has-icons-right">
            <input v-model="model.phone" v-mask="`996-###-###-###`" :class="{ input: true, 'is-danger': errors.phone}" placeholder="996-XXX-XXX-XXX">
            <span v-if="errors.phone" class="icon is-right has-text-danger">
              <fa-icon icon="exclamation-circle" size="lg"></fa-icon>
            </span>
          </div>
        </b-field>

        <b-field
          class="control"
          label="Пароль"
          :type="{'is-danger': errors.password}"
          :message="errors.password"
        >
          <b-field class="control" :type="{'is-danger': errors.password}">
            <b-input v-model="model.password"></b-input>
            <b-button @click="onRandom">
              <fa-icon class="fa-fw" icon="random"></fa-icon>
            </b-button>
          </b-field>
        </b-field>

        <b-field
          :type="{'is-danger': errors.fullname}"
          label="ФИО"
          :message="errors.fullname"
        >
          <b-input v-model="model.fullname"></b-input>
        </b-field>

        <b-field
          :type="{'is-danger': errors.role}"
          label="Роль"
          :message="errors.role"
        >
          <div>
            <b-radio
              v-for="role in getRoles"
              :key="role.value"
              v-model="model.role"
              :native-value="role.value"
              :disabled="editMode"
              class="text-xs lg:text-base"
            >
              <span class="text-sm lg:text-base">{{ role.label }}</span>
            </b-radio>
          </div>
        </b-field>
      </b-form>
    </section>

    <footer class="modal-card-foot">
      <b-button @click="$parent.close">Отмена</b-button>
      <b-button type="is-primary" @click="onSubmit">Отправить</b-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userSchema } from '~/utils/schemas'
import { passwordLength, passwordPattern, userRules } from '~/utils/rules'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    entity: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      model: userSchema(this.entity),
    }
  },
  computed: {
    ...mapGetters([
      'getRoles',
    ]),
    createMode () {
      return !this.entity.id
    },
    editMode () {
      return !!this.entity.id
    },
    rules () {
      let rules = { ...userRules }

      if (this.editMode) {
        if (this.model.password === '') {
          rules.password = []
        } else {
          rules.password = [passwordLength, passwordPattern]
        }
      }

      if (this.editMode) {
        rules = this.$_.omit(rules, ['email'])
      }

      if (this.model.role !== 'CLIENT') {
        rules = this.$_.omit(rules, ['phone'])
      }

      return rules
    }
  },
  watch: {
    'model.role' (newVal, oldVal) {
      if (this.createMode) {
        this.model.phone = ''
      }
    }
  },
  mounted () {
    if (this.createMode) {
      this.onRandom()
    } else if (this.editMode) {
      this.rules.password = []
    }
  },
  methods: {
    onRandom () {
      const collection = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '2', '3', '4', '5', '6', '7', '8', '9']
      this.model.password = this.$_.sampleSize(collection, 6).join('')
    },
    async onSubmit () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }

      const values = {}
      const excluded = ['createdAt', 'updatedAt', 'lastLoginAt']
      Object.keys(this.model).forEach((key) => {
        const value = this.model[key]
        const isNil = this.$_.isNil(value)

        if (!excluded.includes(key) && !isNil && value !== '') {
          values[key] = this.model[key]
        }
      })

      if (this.createMode) {
        this.$axios.$post('users', values)
          .then(this.resolveHandler)
          .catch(this.rejectHandler)
      } else if (this.editMode) {
        this.$axios.$put(`users/${this.entity.id}`, values)
          .then(this.resolveHandler)
          .catch(this.rejectHandler)
      }
    },
    resolveHandler (res) {
      this.$emit('apply')
      this.$buefy.notification.open({
        type: 'is-success',
        message: 'Пользователь сохранен',
      })
    },
    rejectHandler (err) {
      const message = err.response.data.message

      this.$buefy.notification.open({
        type: 'is-danger',
        message,
      })
    }
  }
}
</script>

<style>

</style>
