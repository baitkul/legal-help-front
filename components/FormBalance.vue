<template>
  <div class="modal-card max-w-md mx-auto" @keyup.enter="onSubmit">
    <header class="modal-card-head">
      <div class="modal-card-title">{{ title }}</div>
    </header>

    <section class="modal-card-body py-10">
      <p class="mb-3 text-sm text-gray-700">Текущий баланс: <span class="font-bold">{{ entity.balance ? entity.balance : 0 }}</span></p>

      <b-form ref="form" #default="{ errors }" :model="model" :rules="rules">
        <b-field :type="{'is-danger': errors.amount}" :message="errors.amount">
          <b-field class="control" :type="{'is-danger': errors.amount}">
            <b-input v-model="model.amount" size="text-xl lg:text-2xl" placeholder="Введите сумму"></b-input>
            <span class="button is-static text-xl lg:text-2xl">сом</span>
          </b-field>
        </b-field>
      </b-form>
    </section>

    <footer class="modal-card-foot">
      <b-button type="is-primary" expanded @click="onSubmit">Пополнить</b-button>
    </footer>
  </div>
</template>

<script>
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
      model: {
        amount: '',
      },
      rules: {
        amount: [
          {
            validator: (rule, value, callback) => {
              const pattern = /^[-]?[1-9][0-9]*$/
              if (!pattern.test(value)) {
                callback(new Error('Сумма невалидна'))
              } else {
                callback()
              }
            }
          }
        ]
      },
    }
  },
  methods: {
    async onSubmit () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }

      const params = {
        amount: Number.parseInt(this.model.amount),
        receiverId: this.entity.id,
      }

      this.$axios.$post('transactions', params)
        .then(this.resolveHandler)
        .catch(this.rejectHandler)
    },
    resolveHandler (res) {
      this.$emit('apply')
      this.$buefy.notification.open({
        type: 'is-success',
        message: 'Отправлено',
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
