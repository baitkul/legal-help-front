<script>
import Schema from 'async-validator'

export default {
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      errors: {}
    }
  },
  computed: {
    validator () {
      return new Schema(this.rules)
    }
  },
  watch: {
    model: {
      deep: true,
      async handler (model) {
        try {
          await this.validator.validate(model)
          this.errors = {}
        } catch (error) {
          this.errors = this.mapErrorsLazy(error)
        }
      }
    }
  },
  methods: {
    async validate () {
      try {
        await this.validator.validate(this.model)
        this.errors = {}
        return true
      } catch (error) {
        this.errors = this.mapErrors(error)
        return false
      }
    },
    reset () {
      this.errors = {}
    },
    mapErrors (error) {
      if (!('errors' in error)) {
        throw error
      }

      const { errors } = error
      const errorsMap = {}

      for (const { field, message } of errors) {
        errorsMap[field] = message
      }

      return errorsMap
    },
    mapErrorsLazy (error) {
      const errors = this.mapErrors(error)
      const errorsMap = {}

      for (const fieldName in errors) {
        if (!this.model[fieldName]) {
          continue
        }

        errorsMap[fieldName] = errors[fieldName]
      }

      return errorsMap
    }
  },
  render (createElement) {
    if (!this.$scopedSlots.default) {
      return null
    }

    const slot = this.$scopedSlots.default({ errors: this.errors })

    return Array.isArray(slot) && slot.length > 1
      ? createElement('div', slot)
      : slot
  }
}
</script>
