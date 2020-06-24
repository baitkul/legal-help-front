<template>
  <div>
    <nav class="breadcrumb">
      <ul>
        <li class="is-active">
          <nuxt-link to="/">Настройки</nuxt-link>
        </li>
      </ul>
    </nav>

    <div class="mt-3 p-3 border bg-white rounded shadow max-w-2xl">
      <aside class="menu">
        <p class="menu-label">
          Общие
        </p>
        <ul class="menu-list">
          <li>
            <nuxt-link to="/settings/profile">Профиль</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/settings/password">Смена пароля</nuxt-link>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Настройки'
    }
  }
}
</script>

<style>

</style>
