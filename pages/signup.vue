<template>
  <div @keyup.enter="onSubmit">
    <div class="font-bold text-2xl lg:text-3xl text-center">
      Регистрация
    </div>

    <div class="mt-5">
      <b-form ref="form" #default="{ errors }" :model="model" :rules="rules">
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
          :type="{'is-danger': errors.fullname}"
          label="ФИО"
          :message="errors.fullname"
        >
          <b-input v-model="model.fullname"></b-input>
        </b-field>

        <b-field
          :type="{'is-danger': errors.password}"
          label="Пароль"
          :message="errors.password"
        >
          <b-input v-model="model.password" type="password" password-reveal></b-input>
        </b-field>
      </b-form>
    </div>

    <div class="mt-5">
      <b-button type="is-primary" expanded @click="onSubmit">Регистрация</b-button>
      <b-button class="mt-1" expanded tag="nuxt-link" to="/">Отмена</b-button>
    </div>
  </div>
</template>

<script>
import { signupRules } from '~/utils/rules'

export default {
  auth: 'guest',
  layout: 'guest',
  data () {
    return {
      model: {
        phone: '',
        fullname: '',
        password: '',
      },
      rules: signupRules,
    }
  },
  methods: {
    async onSubmit () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }

      this.$axios.$post('', this.model)
        .then(this.resolveHandler)
        .catch(this.rejectHandler)
    },
    resolveHandler (res) {
      this.$buefy.notification.open({
        type: 'is-success',
        message: 'Отправлено',
      })

      this.email = ''
    },
    rejectHandler (err) {
      const message = err.response.data.message

      this.$buefy.notification.open({
        type: 'is-danger',
        message,
      })
    }
  },
  head () {
    return {
      title: 'Регистрация'
    }
  }
}
</script>

<style>

</style>
