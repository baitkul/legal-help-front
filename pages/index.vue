<template>
  <div @keyup.enter="onSubmit">
    <div class="text-2xl font-bold text-center lg:text-3xl">
      Вход в систему
    </div>

    <div class="mt-5">
      <b-form ref="form" #default="{ errors }" :model="model" :rules="rules">
        <b-field
          :type="{'is-danger': errors.email}"
          label="Эл. почта"
          :message="errors.email"
        >
          <b-input v-model="model.email"></b-input>
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
      <b-button type="is-primary" expanded @click="onSubmit">Войти</b-button>
      <nuxt-link class="inline-block mt-5 text-xs text-blue-500" to="/recovery">Забыли пароль?</nuxt-link>
    </div>
  </div>
</template>

<script>
import { loginRules } from '~/utils/rules'

export default {
  auth: 'guest',
  layout: 'guest',
  data () {
    return {
      model: {
        email: '',
        password: '',
      },
      rules: loginRules,
    }
  },
  methods: {
    async onSubmit () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }

      this.$auth.loginWith('local', {
        data: { ...this.model }
      })
        .catch((err) => {
          const status = err.response.status
          const message = this.$_.get(err, 'response.data.message', 'Неверная email или пароль')

          if (status === 400 || status === 401) {
            this.$buefy.notification.open({ type: 'is-danger', message })
          }
        })
    }
  },
  head () {
    return {
      title: 'Вход'
    }
  }
}
</script>

<style>

</style>
