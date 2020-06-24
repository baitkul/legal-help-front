<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="modal-card-title">{{ title }}</div>
    </header>

    <section class="modal-card-body px-0">
      <div class="panel-block">
        <span class="panel-icon">
          <fa-icon class="fa-fw" icon="user"></fa-icon>
        </span>
        {{ model.fullname }}
      </div>

      <div class="panel-block">
        <span class="panel-icon">
          <fa-icon class="fa-fw" icon="phone-alt"></fa-icon>
        </span>
        {{ model.phone }}
      </div>

      <div class="panel-block">
        <span class="panel-icon">
          <fa-icon class="fa-fw" icon="info"></fa-icon>
        </span>
        {{ model.description }}
      </div>

      <div class="panel-block">
        <span class="panel-icon">
          <fa-icon class="fa-fw" icon="map-marker-alt"></fa-icon>
        </span>
        {{ model.address }}
      </div>

      <div v-if="model.createdAt" class="panel-block">
        <span class="panel-icon">
          <fa-icon class="fa-fw" icon="calendar-alt"></fa-icon>
        </span>
        {{ format(model.createdAt) }}
      </div>
    </section>

    <footer class="modal-card-foot">
      <b-button @click="$parent.close">Отмена</b-button>
    </footer>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { appealSchema } from '~/utils/schemas'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    entity: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      model: appealSchema(this.entity),
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
