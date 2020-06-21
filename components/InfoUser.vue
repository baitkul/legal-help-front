<template>
  <div>
    <section class="modal-card-body">
      <article class="panel is-primary">
        <div class="panel-block">
          <span class="panel-icon">
            <fa-icon class="fa-fw" icon="envelope"></fa-icon>
          </span>
          {{ model.email }}
        </div>

        <div v-if="model.phone" class="panel-block">
          <span class="panel-icon">
            <fa-icon class="fa-fw" icon="phone"></fa-icon>
          </span>
          {{ model.phone }}
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

        <div v-if="model.createdAt" class="panel-block">
          <span class="panel-icon">
            <fa-icon class="fa-fw" icon="calendar-alt"></fa-icon>
          </span>
          {{ format(model.createdAt) }}
        </div>
      </article>
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
