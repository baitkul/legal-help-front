<template>
  <div class="modal-card" @keyup.enter="onSubmit">
    <header class="modal-card-head">
      <div class="modal-card-title">{{ title }}</div>
    </header>

    <section class="modal-card-body">
      <b-form ref="form" #default="{ errors }" :model="model" :rules="rules">
        <b-field
          :type="{'is-danger': errors.amount}"
          label="Сумма"
          :message="errors.amount"
        >
          <b-input id="amount" v-model="model.amount"></b-input>
        </b-field>
      </b-form>
    </section>

    <footer class="modal-card-foot">
      <b-button @click="$parent.close">Отмена</b-button>
      <b-button type="is-primary" @click="onSubmit">Отправить</b-button>
    </footer>
  </div>
</template>

<script>
import { required } from '~/utils/rules'

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
          required,
          {
            validator: (rule, value, callback) => {
              const pattern = /^[1-9][0-9]*$/
              if (!pattern.test(value)) {
                callback(new Error('Сумма невалидна'))
              }

              if (value > this.entity.balance) {
                callback(new Error('На вашем балансе недостаточно средств'))
              } else {
                callback()
              }
            }
          },
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
        user_id: this.entity.id,
      }

      this.$axios.$post('users/balance', params)
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
input#amount {
  @apply text-xl !important;
}
@screen lg {
  input#amount {
    @apply text-2xl !important;
  }
}
</style>
