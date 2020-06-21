<template>
  <div>
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
            <input v-model="model.phone" v-mask="`996-###-###-###`" :class="{ input: true, 'is-danger': errors.phone}" autocomplete="on" placeholder="996-XXX-XXX-XXX">
            <span v-if="errors.phone" class="icon is-right has-text-danger">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="exclamation-circle"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="svg-inline--fa fa-exclamation-circle fa-w-16 fa-lg"
              >
                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" class=""></path>
              </svg>
            </span>
          </div>
        </b-field>

        <b-field
          label="Пароль"
          :type="{'is-danger': errors.password}"
          :message="errors.password"
        >
          <div class="flex">
            <b-input v-model="model.password"></b-input>
            <p class="control">
              <b-button @click="onRandom">
                <fa-icon class="fa-fw" icon="random"></fa-icon>
              </b-button>
            </p>
          </div>
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
            >
              {{ role.label }}
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
    entity: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      model: userSchema(this.entity),
      rules: userRules,
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
    }
  },
  watch: {
    'model.password' (newVal, oldVal) {
      if (this.editMode) {
        if (newVal === '') {
          this.rules.password = []
        } else {
          this.rules.password = [passwordLength, passwordPattern]
        }
      }
    },
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

      let values = this.$_.omitBy(this.model, this.$_.isNil)
      if (this.editMode && values.password === '') {
        values = this.$_.omit(values, ['password'])
      }

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
