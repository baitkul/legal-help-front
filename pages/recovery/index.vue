<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="modal-card-title">Восстановление доступа</div>
    </header>

    <section class="modal-card-body">
      <b-field label="Эл. почта">
        <b-input v-model="model.email"></b-input>
      </b-field>
    </section>

    <footer class="modal-card-foot">
      <b-button tag="nuxt-link" to="/">Отмена</b-button>
      <b-button type="is-primary" @click="onSubmit">Отправить</b-button>
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
      },
    }
  },
  methods: {
    onSubmit () {
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
