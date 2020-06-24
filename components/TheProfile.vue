<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <fa-icon class="fa-fw" icon="user-circle" size="4x"></fa-icon>
        </div>
        <div class="media-content">
          <p class="title">{{ getUser.fullname }}</p>
          <p class="subtitle">{{ getUser.email }}</p>
        </div>
      </div>
    </div>

    <div v-if="getUser.balance" class="card-footer">
      <p class="card-footer-item justify-start">
        <fa-icon class="fa-fw mr-2" icon="wallet"></fa-icon>
        {{ getUser.balance }} сом
      </p>
    </div>

    <div v-if="getUser.phone" class="card-footer">
      <p class="card-footer-item justify-start">
        <fa-icon class="fa-fw mr-2" icon="phone-alt"></fa-icon>
        {{ getUser.phone }}
      </p>
    </div>

    <div class="card-footer">
      <p class="card-footer-item justify-start">
        <fa-icon class="fa-fw mr-2" icon="id-card"></fa-icon>
        {{ getRoles.find(role => role.value === getUser.role).label }}
      </p>
    </div>

    <div class="card-footer">
      <p class="card-footer-item justify-start">
        <fa-icon class="fa-fw mr-2" icon="calendar-alt"></fa-icon>
        {{ format(getUser.createdAt) }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { format } from 'date-fns'

export default {
  computed: {
    ...mapGetters([
      'getUser',
      'getRoles',
    ]),
  },
  methods: {
    format (date) {
      return format(new Date(date), 'dd.MM.yyyy HH:mm:ss')
    }
  }
}
</script>

<style>

</style>
