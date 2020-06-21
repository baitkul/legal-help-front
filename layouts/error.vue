<template>
  <div v-if="isLoggedIn" class="pt-64 text-center text-gray-700">
    <div class="font-bold text-6xl tracking-widest">
      {{ statusCode }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
      let result = ''
      switch (this.statusCode) {
        case 404:
          result = 'Страница не найдена'
          break

        case 500:
          result = 'Ошибка сервера'
          break

        default:
          result = this.error.message || 'Ошибка'
          break
      }
      return result
    }
  },
  created () {
    if (!this.isLoggedIn) {
      this.$router.push('/')
    }
  },
  head () {
    return {
      title: this.isLoggedIn ? this.message : ''
    }
  },
}
</script>

<style>

</style>
