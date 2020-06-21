<template>
  <div class="min-h-screen flex">
    <div
      v-if="isLoggedIn"
      class="p-1 w-16 lg:w-56 h-full fixed flex flex-col bg-gray-700 text-white"
    >
      <div class="p-3 bg-gray-900 flex flex-col items-center text-center lg:text-left cursor-default rounded">
        <fa-icon class="fa-fw lg:mr-1" icon="user-circle" size="2x"></fa-icon>
        <div class="mt-2 hidden lg:block font-bold text-xs text-center">{{ getUser.fullname }}</div>
      </div>

      <nuxt-link class="mt-2 p-3 hover:bg-gray-900 text-center lg:text-left rounded" to="/appeals">
        <fa-icon class="fa-fw lg:mr-1" icon="file-alt" size="lg"></fa-icon>
        <span class="hidden lg:inline-block">Обращения</span>
      </nuxt-link>

      <nuxt-link v-if="!isClient" class="mt-2 p-3 hover:bg-gray-900 text-center lg:text-left rounded" to="/users">
        <fa-icon class="fa-fw lg:mr-1" icon="user-friends" size="lg"></fa-icon>
        <span class="hidden lg:inline-block">Пользователи</span>
      </nuxt-link>

      <nuxt-link class="mt-2 p-3 hover:bg-gray-900 text-center lg:text-left rounded" to="/settings">
        <fa-icon class="fa-fw lg:mr-1" icon="cog" size="lg"></fa-icon>
        <span class="hidden lg:inline-block">Настройки</span>
      </nuxt-link>

      <button class="mt-2 p-3 hover:bg-gray-900 text-center lg:text-left rounded" @click="$auth.logout()">
        <fa-icon class="fa-fw lg:mr-1" icon="sign-out-alt" size="lg"></fa-icon>
        <span class="hidden lg:inline-block">Выйти</span>
      </button>
    </div>
    <nuxt class="ml-16 lg:ml-56 flex-1 bg-gray-100 p-3" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
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
a:hover,
.nuxt-link-exact-active {
  @apply text-yellow-500;
}
</style>
