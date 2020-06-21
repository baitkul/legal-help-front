<template>
  <div class="min-h-screen bg-gray-100 pt-40">
    <nuxt class="mx-auto border rounded shadow" style="width: 22rem;" />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>

<style>

</style>
