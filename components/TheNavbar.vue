<template>
  <b-navbar v-if="isLoggedIn" type="is-white" spaced shadow>
    <template #brand>
      <b-navbar-item tag="nuxt-link" to="/">
        <span class="font-bold text-xl">СЮП</span>
      </b-navbar-item>
    </template>

    <template #start>
      <b-navbar-item tag="nuxt-link" to="/appeals">
        <fa-icon class="fa-fw mr-2" icon="file-alt"></fa-icon>
        Обращения
      </b-navbar-item>

      <b-navbar-item v-if="isAdmin || isOperator" tag="nuxt-link" to="/users">
        <fa-icon class="fa-fw mr-2" icon="user-friends"></fa-icon>
        Пользователи
      </b-navbar-item>

      <b-navbar-item tag="nuxt-link" to="/transactions">
        <fa-icon class="fa-fw mr-2" icon="exchange-alt"></fa-icon>
        Транзакции
      </b-navbar-item>

      <b-navbar-dropdown>
        <template #label>
          <fa-icon class="fa-fw mr-2" icon="cog"></fa-icon>
          Настройки
        </template>

        <b-navbar-item tag="nuxt-link" to="/settings/profile">Профиль</b-navbar-item>
        <b-navbar-item tag="nuxt-link" to="/settings/password">Смена пароля</b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="nuxt-link" to="/profile" @click="$auth.logout()">
        <fa-icon class="fa-fw mr-2" icon="user-circle"></fa-icon>
        {{ getUser.fullname }}
      </b-navbar-item>

      <b-navbar-item v-if="isClient" tag="div">
        <p class="card-footer-item justify-start">
          <fa-icon class="fa-fw mr-2" icon="wallet"></fa-icon>
          {{ getUser.balance ? getUser.balance : 0 }} сом
        </p>
      </b-navbar-item>

      <b-navbar-item tag="div">
        <div>
          <b-button class="border-none font-normal" @click="$auth.logout()">
            <fa-icon class="fa-fw mr-2" icon="sign-out-alt"></fa-icon>
            Выйти
          </b-button>
        </div>
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
      'isAdmin',
      'isOperator',
      'isClient',
      'getUser',
    ])
  },
}
</script>

<style>
.navbar-brand > a.navbar-item {
  @apply bg-transparent !important;
}
</style>
