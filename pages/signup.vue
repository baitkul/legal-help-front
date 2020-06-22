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
      <b-button class="w-full" type="is-primary" @click="onSubmit">Регистрация</b-button>
      <b-button class="mt-1 w-full" tag="nuxt-link" to="/">Отмена</b-button>
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
