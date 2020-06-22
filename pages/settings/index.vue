<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="font-bold uppercase lg:text-2xl">Настройки</div>

      <b-button type="is-primary" tag="nuxt-link" to="/settings/password">
        <fa-icon class="fa-fw mr-1" icon="key"></fa-icon>
        <span class="font-bold">Смена пароля</span>
      </b-button>
    </div>

    <div class="mt-3 border max-w-2xl rounded shadow">
      <header class="modal-card-head">
        <div class="modal-card-title">Профиль</div>
      </header>

      <FormSettingsProfile />
    </div>
  </div>
</template>

<script>
import FormSettingsProfile from '~/components/FormSettingsProfile'

export default {
  components: {
    FormSettingsProfile,
  },
  head () {
    return {
      title: 'Настройки'
    }
  }
}
</script>

<style>

</style>
