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
      <div class="flex lg:justify-end">
        <div class="mt-3">
          <b-field class="control">
            <b-select v-model="filter">
              <option value="all">Все</option>
              <option value="replenishment">Пополнение баланса</option>
              <option value="payment">Снятие с баланса</option>
              <option value="cancelled">Отменённый</option>
            </b-select>
          </b-field>
        </div>
      </div>

      <b-table v-if="!loading" class="mt-3" :data="data">
        <template #default="{ row }">
          <b-table-column label="ID">
            {{ row.id }}
          </b-table-column>

          <b-table-column v-if="isAdmin || isOperator" label="Получатель">
            {{ row.receiver.fullname }}
          </b-table-column>

          <b-table-column v-if="isAdmin || isOperator" label="Отправитель">
            {{ row.remitterDetails }}
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

          <b-table-column label="Дата создания">
            <b-tag class="is-light font-bold">
              {{ format(row.createdAt) }}
            </b-tag>
          </b-table-column>

          <b-table-column v-if="isAdmin || isOperator" label="Дата отмены">
            <b-tag class="is-light font-bold">
              {{ format(row.canceledAt) }}
            </b-tag>
          </b-table-column>

          <b-table-column v-if="isAdmin || isOperator" label="Действия">
            <div>
              <b-dropdown v-if="row.action === 'REPLENISHMENT' && !row.canceledAt" position="is-top-left">
                <b-button slot="trigger" type="is-text">
                  <fa-icon class="fa-fw" icon="ellipsis-h"></fa-icon>
                </b-button>

                <b-dropdown-item tag="button" @click="onCancel(row.id)">
                  <fa-icon class="fa-fw mr-2" icon="history"></fa-icon>
                  Отмена транзакции
                </b-dropdown-item>
              </b-dropdown>
            </div>
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
      filter: 'all',
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'isOperator',
      'isClient',
    ])
  },
  watch: {
    filter (newVal, oldVal) {
      this.current = 1
      this.fetch()
    },
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const params = {
        page: this.current,
        pageSize: this.perPage,
        filter: this.filter,
      }

      const data = await this.$axios.$get('transactions', { params })
      this.data = data.results
      this.total = data.total
      this.loading = false
    },
    onCancel (id) {
      this.$buefy.dialog.confirm({
        title: 'Отменить транзакцию',
        message: 'Вы действительно хотите отменить данную транзакцию?',
        cancelText: 'Назад',
        confirmText: 'Отменить',
        onConfirm: () => {
          this.$axios.$post('transactions/cancel', { id })
            .then(() => {
              this.$buefy.notification.open({
                type: 'is-success',
                message: 'Транзакция отменена',
              })

              this.fetch()
            })
            .catch((err) => {
              const message = err.response.data.message

              this.$buefy.notification.open({
                type: 'is-danger',
                message,
              })
            })
        }
      })
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
