<template>
  <div @keyup.enter="onSubmit">
    <div class="font-bold text-2xl lg:text-3xl text-center">
      Восстановление доступа
    </div>

    <div class="mt-5">
      <b-form ref="form" #default="{ errors }" :model="model" :rules="rules">
        <b-field
          :type="{'is-danger': errors.password}"
          label="Новый пароль"
          :message="errors.password"
        >
          <b-input v-model="model.password" type="password" password-reveal></b-input>
        </b-field>

        <b-field
          :type="{'is-danger': errors.password2}"
          label="Пароль ещё раз"
          :message="errors.password2"
        >
          <b-input v-model="model.password2" type="password" password-reveal></b-input>
        </b-field>
      </b-form>
    </div>

    <div class="mt-5">
      <b-button class="w-full" type="is-primary" @click="onSubmit">Отправить</b-button>
      <b-button class="mt-1 w-full" tag="nuxt-link" to="/">Отмена</b-button>
    </div>
  </div>
</template>

<script>
import { passwordLength, passwordPattern } from '~/utils/rules'

export default {
  auth: 'guest',
  layout: 'guest',
  data () {
    return {
      model: {
        password: '',
        password2: '',
      },
      rules: {
        password: [{ required: true, message: 'Обязательное поле' }, passwordLength, passwordPattern],
        password2: [
          { required: true, message: 'Обязательное поле' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.model.password) {
                callback(new Error('Пароли не совпадают'))
              } else {
                callback()
              }
            }
          },
        ]
      }
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
      title: 'Восстановление доступа'
    }
  }
}
</script>

<style>

</style>
