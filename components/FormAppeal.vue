<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="modal-card-title">{{ title }}</div>
    </header>

    <section class="modal-card-body">
      <b-form ref="form" #default="{ errors }" :model="model" :rules="rules">
        <b-field
          :type="{'is-danger': errors.fullname}"
          label="ФИО абонента"
          :message="errors.fullname"
        >
          <b-input v-model="model.fullname"></b-input>
        </b-field>

        <b-field
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
          :type="{'is-danger': errors.address}"
          label="Местонахождение"
          :message="errors.address"
        >
          <b-input v-model="model.address" type="textarea" rows="3"></b-input>
        </b-field>

        <b-field
          :type="{'is-danger': errors.description}"
          label="Суть обращения"
          :message="errors.description"
        >
          <b-input v-model="model.description" type="textarea" rows="5"></b-input>
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
import { appealSchema } from '~/utils/schemas'
import { appealRules } from '~/utils/rules'

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
      model: appealSchema(this.entity),
      rules: appealRules,
    }
  },
  computed: {
    createMode () {
      return !this.entity.id
    },
    editMode () {
      return !!this.entity.id
    }
  },
  methods: {
    async onSubmit () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }

      const values = this.$_.omitBy(this.model, this.$_.isNil)
      if (this.createMode) {
        this.$axios.$post('appeals', values)
          .then(this.resolveHandler)
          .catch(this.rejectHandler)
      } else if (this.editMode) {
        this.$axios.$put(`appeals/${this.entity.id}`, values)
          .then(this.resolveHandler)
          .catch(this.rejectHandler)
      }
    },
    resolveHandler (res) {
      this.$emit('apply')
      this.$buefy.notification.open({
        type: 'is-success',
        message: 'Обращение сохранено',
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
