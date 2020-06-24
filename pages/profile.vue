<template>
  <div>
    <nav class="breadcrumb">
      <ul>
        <li class="is-active">
          <nuxt-link to="/">Профиль</nuxt-link>
        </li>
      </ul>
    </nav>

    <div class="mt-3 border rounded shadow max-w-2xl">
      <TheProfile />
    </div>
  </div>
</template>

<script>
import TheProfile from '~/components/TheProfile'

export default {
  components: {
    TheProfile,
  },
  head () {
    return {
      title: 'Профиль'
    }
  }
}
</script>

<style>

</style>
