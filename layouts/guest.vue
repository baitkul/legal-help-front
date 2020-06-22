<template>
  <div class="min-h-screen lg:bg-gray-100 pt-40">
    <nuxt class="max-w-md mx-auto p-5 bg-white lg:border lg:rounded lg:shadow" />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>

<style>

</style>
