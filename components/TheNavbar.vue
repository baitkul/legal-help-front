<template>
  <b-navbar v-if="isLoggedIn" type="is-white" spaced shadow>
    <template #brand>
      <b-navbar-item tag="nuxt-link" to="/">
        <span class="font-bold">СЮП</span>
      </b-navbar-item>
    </template>

    <template #start>
      <b-navbar-item tag="nuxt-link" to="/appeals">
        <fa-icon class="fa-fw mr-1" icon="file-alt"></fa-icon>
        Обращения
      </b-navbar-item>
      <b-navbar-item v-if="!isClient" tag="nuxt-link" to="/users">
        <fa-icon class="fa-fw mr-1" icon="user-friends"></fa-icon>
        Пользователи
      </b-navbar-item>
      <b-navbar-dropdown>
        <template #label>
          <fa-icon class="fa-fw mr-1" icon="boxes"></fa-icon>
          Администрирование
        </template>

        <b-navbar-item tag="nuxt-link" to="/transactions">
          Транзакции
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" to="/tokens">
          Токены
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="nuxt-link" to="/settings">
        <fa-icon class="fa-fw mr-1" icon="user-circle"></fa-icon>
        {{ getUser.fullname }}
      </b-navbar-item>
      <b-navbar-item tag="button" @click="$auth.logout()">
        <fa-icon class="fa-fw mr-1" icon="sign-out-alt"></fa-icon>
        Выйти
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'isClient',
      'getUser',
    ])
  },
}
</script>

<style>
.navbar-brand > a.navbar-item:hover {
  @apply bg-transparent !important;
}
</style>
