<template>
  <div class="modal-card w-full mx-0" @keyup.enter="onSubmit">
    <header class="modal-card-head">
      <div class="modal-card-title">Смена пароля</div>
    </header>

    <section class="modal-card-body">
      <b-form ref="form" #default="{ errors }" :model="model" :rules="rules">
        <b-field
          :type="{'is-danger': errors.password}"
          label="Старый пароль"
          :message="errors.password"
        >
          <b-input v-model="model.password" type="password" password-reveal></b-input>
        </b-field>

        <b-field
          :type="{'is-danger': errors.newPassword}"
          label="Новый пароль"
          :message="errors.newPassword"
        >
          <b-input v-model="model.newPassword" type="password" password-reveal></b-input>
        </b-field>
      </b-form>
    </section>

    <footer class="modal-card-foot">
      <b-button type="is-primary" @click="onSubmit">Отправить</b-button>
    </footer>
  </div>
</template>

<script>
import { passwordRules } from '~/utils/rules'

export default {
  data () {
    return {
      model: {
        password: '',
        newPassword: '',
      },
      rules: passwordRules,
    }
  },
  methods: {
    async onSubmit () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }

      this.$axios.$put('auth/user', this.model)
        .then(this.resolveHandler)
        .catch(this.rejectHandler)
    },
    resolveHandler (res) {
      this.$buefy.notification.open({
        type: 'is-success',
        message: 'Пароль обновлён',
      })

      this.model.password = ''
      this.model.newPassword = ''
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
