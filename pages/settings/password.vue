<template>
  <div>
    <nav class="breadcrumb">
      <ul>
        <li>
          <nuxt-link to="/settings">Настройки</nuxt-link>
        </li>
        <li class="is-active">
          <nuxt-link to="/">Смена пароля</nuxt-link>
        </li>
      </ul>
    </nav>

    <div class="max-w-2xl mt-3 border rounded shadow">
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
