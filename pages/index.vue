<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="modal-card-title">Вход</div>
    </header>

    <section class="modal-card-body">
      <b-field label="Эл. почта">
        <b-input v-model="model.email"></b-input>
      </b-field>

      <b-field label="Пароль">
        <b-input v-model="model.password" type="password" password-reveal></b-input>
      </b-field>
    </section>

    <footer class="modal-card-foot justify-between">
      <nuxt-link class="self-start text-xs text-blue-500" to="/recovery">Забыли пароль?</nuxt-link>
      <b-button type="is-primary" @click="onSubmit">Войти</b-button>
    </footer>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'guest',
  data () {
    return {
      model: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit () {
      this.$auth.loginWith('local', {
        data: { ...this.model }
      })
        .catch((err) => {
          const status = err.response.status

          if (status === 400 || status === 401) {
            this.$buefy.notification.open({
              type: 'is-danger',
              message: 'Неверная эл. почта или пароль',
            })
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
