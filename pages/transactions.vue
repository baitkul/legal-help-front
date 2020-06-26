<template>
  <div>
    <nav class="breadcrumb">
      <ul>
        <li class="is-active">
          <nuxt-link to="/">Транзакции</nuxt-link>
        </li>
      </ul>
    </nav>

    <div class="mt-3 border bg-white px-3 pb-3 rounded shadow">
      <b-table v-if="!loading" class="mt-3" :data="data">
        <template #default="{ row }">
          <b-table-column v-if="!isClient" label="Получатель">
            {{ row.receiver.fullname }}
          </b-table-column>

          <b-table-column label="Отправитель">
            {{ row.originatorDetails }}
          </b-table-column>

          <b-table-column label="Дата создания">
            <b-tag class="is-light font-bold">
              {{ format(row.createdAt) }}
            </b-tag>
          </b-table-column>

          <b-table-column label="Сумма">
            <fa-icon
              class="fa-fw mr-2 is-success"
              :class="row.amount > 0 ? 'text-green-500' : 'text-red-500'"
              :icon="row.amount > 0 ? 'arrow-up' : 'arrow-down'"
            >
            </fa-icon>
            {{ row.amount }}
          </b-table-column>
        </template>

        <template #empty>
          <section class="section">
            <div class="content text-gray-700 text-center">
              <p>
                <fa-icon icon="frown" size="3x"></fa-icon>
              </p>
              <p class="mt-3">Нет данных</p>
            </div>
          </section>
        </template>
      </b-table>

      <div class="mt-3">
        <b-pagination
          :total="total"
          :per-page="perPage"
          :current.sync="current"
          @change="pageChange"
        >
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: true,
      data: [],
      total: 0,
      current: 1,
      perPage: 10,
    }
  },
  computed: {
    ...mapGetters([
      'isClient',
    ])
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const params = {
        page: this.current,
        pageSize: this.perPage,
      }

      const data = await this.$axios.$get('transactions', { params })
      this.data = data.results
      this.total = data.total
      this.loading = false
    },
    format (date) {
      return format(new Date(date), 'dd.MM.yyyy HH:mm:ss')
    },
    pageChange (page) {
      this.current = page
      this.fetch()
    }
  },
  head () {
    return {
      title: 'Транзакции'
    }
  }
}
</script>

<style>

</style>
