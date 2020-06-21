<template>
  <div class="min-h-screen flex flex-col">
    <TheNavbar />
    <nuxt class="flex-1 bg-gray-100 p-3" />
  </div>
</template>

<script>
import TheNavbar from '~/components/TheNavbar'

export default {
  middleware: 'auth',
  components: {
    TheNavbar,
  },
}
</script>

<style>

</style>
