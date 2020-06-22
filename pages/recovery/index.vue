<template>
  <div @keyup.enter="onSubmit">
    <div class="font-bold text-2xl lg:text-3xl text-center">
      Восстановление доступа
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
      </b-form>

      <span class="text-xs text-gray-700">Вам на эл. почту будет выслана инструкция по восстановлению пароля</span>
    </div>

    <div class="mt-5">
      <b-button class="w-full" type="is-primary" @click="onSubmit">Отправить</b-button>
      <b-button class="mt-1 w-full" tag="nuxt-link" to="/">Отмена</b-button>
    </div>
  </div>
</template>

<script>
import { required, emailPattern } from '~/utils/rules'

export default {
  auth: 'guest',
  layout: 'guest',
  data () {
    return {
      model: {
        email: '',
      },
      rules: {
        email: [required, emailPattern]
      },
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
