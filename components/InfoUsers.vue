<template>
  <div>
    <section class="modal-card-body">
      <article class="panel is-primary">
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
      </article>
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
