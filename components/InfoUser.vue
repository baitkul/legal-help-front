<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="modal-card-title">{{ title }}</div>
    </header>

    <section class="px-0 modal-card-body">
      <div class="panel-block">
        <span class="panel-icon">
          <fa-icon class="fa-fw" icon="envelope"></fa-icon>
        </span>
        {{ model.email }}
      </div>

      <div v-if="model.phone" class="panel-block">
        <span class="panel-icon">
          <fa-icon class="fa-fw" icon="phone-alt"></fa-icon>
        </span>
        <a :href="`tel:+${model.phone}`" class="underline">+{{ model.phone }}</a>
      </div>

      <div class="panel-block">
        <span class="panel-icon">
          <fa-icon class="fa-fw" icon="user"></fa-icon>
        </span>
        {{ model.fullname }}
      </div>

      <div class="panel-block">
        <span class="panel-icon">
          <fa-icon class="fa-fw" icon="id-card"></fa-icon>
        </span>
        {{ getRoles.find(role => role.value === model.role).label }}
      </div>

      <div class="panel-block">
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
import { mapGetters } from 'vuex'
import { format } from 'date-fns'
import { userSchema } from '~/utils/schemas'

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
      model: userSchema(this.entity),
    }
  },
  computed: {
    ...mapGetters([
      'getRoles',
    ])
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
