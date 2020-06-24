<template>
  <div>
    <nav class="breadcrumb">
      <ul>
        <li>
          <nuxt-link to="/settings">Настройки</nuxt-link>
        </li>
        <li class="is-active">
          <nuxt-link to="/">Профиль</nuxt-link>
        </li>
      </ul>
    </nav>

    <div class="max-w-2xl mt-3 border rounded shadow">
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
