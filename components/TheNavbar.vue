<template>
  <b-navbar v-if="isLoggedIn" type="is-primary" shadow>
    <template #brand>
      <b-navbar-item tag="nuxt-link" to="/">СЮП</b-navbar-item>
    </template>

    <template #start>
      <b-navbar-item tag="nuxt-link" to="/appeals">Обращения</b-navbar-item>
      <b-navbar-item v-if="!isClient" tag="nuxt-link" to="/users">Пользователи</b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/settings">Настройки</b-navbar-item>
    </template>

    <template #end>
      <b-navbar-dropdown :label="getUser.fullname">
        <b-navbar-item tag="button" @click="$auth.logout()">Выйти</b-navbar-item>
      </b-navbar-dropdown>
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

</style>
