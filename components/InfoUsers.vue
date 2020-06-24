<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="modal-card-title">{{ title }}</div>
    </header>

    <section class="modal-card-body px-0">
      <template v-if="data.length">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="panel-block"
        >
          <span class="panel-icon">
            <fa-icon class="fa-fw" icon="user"></fa-icon>
          </span>
          {{ item.fullname }}
        </div>
      </template>

      <div v-else class="px-5 text-sm">
        Нет данных
      </div>
    </section>

    <footer class="modal-card-foot">
      <b-button @click="$parent.close">Отмена</b-button>
    </footer>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    }
  },
  methods: {
    format (date) {
      return format(new Date(date), 'dd.MM.yyyy HH:mm:ss')
    }
  }
}
</script>

<style>

</style>
