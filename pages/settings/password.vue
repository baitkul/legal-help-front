<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="font-bold uppercase lg:text-2xl">Настройки</div>

      <b-button type="is-primary" tag="nuxt-link" to="/settings">
        <fa-icon class="fa-fw mr-1" icon="user-circle"></fa-icon>
        <span class="font-bold">Профиль</span>
      </b-button>
    </div>

    <div class="mt-3 border max-w-2xl rounded shadow">
      <header class="modal-card-head">
        <div class="modal-card-title">Смена пароля</div>
      </header>

      <FormSettingsPassword />
    </div>
  </div>
</template>

<script>
import FormSettingsPassword from '~/components/FormSettingsPassword'

export default {
  components: {
    FormSettingsPassword,
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
