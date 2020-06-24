<template>
  <div class="modal-card w-full mx-0" @keyup.enter="onSubmit">
    <header class="modal-card-head">
      <div class="modal-card-title">Профиль</div>
    </header>

    <section class="modal-card-body">
      <b-form ref="form" #default="{ errors }" :model="model" :rules="rules">
        <b-field
          :type="{'is-danger': errors.email}"
          label="Эл. почта"
          :message="errors.email"
        >
          <b-input v-model="model.email"></b-input>
        </b-field>

        <b-field
          :type="{'is-danger': errors.fullname}"
          label="ФИО"
          :message="errors.fullname"
        >
          <b-input v-model="model.fullname"></b-input>
        </b-field>
      </b-form>
    </section>

    <footer class="modal-card-foot">
      <b-button type="is-primary" @click="onSubmit">Отправить</b-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { profileRules as rules } from '~/utils/rules'

export default {
  data () {
    return {
      model: {
        email: '',
        fullname: '',
      },
      rules,
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
    ]),
  },
  created () {
    this.model.email = this.getUser.email
    this.model.fullname = this.getUser.fullname
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
        message: 'Настройки сохранены',
      })

      this.$auth.fetchUser()
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
