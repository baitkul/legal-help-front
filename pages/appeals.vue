<template>
  <div>
    <nav class="breadcrumb">
      <ul>
        <li class="is-active">
          <nuxt-link to="/">Обращения</nuxt-link>
        </li>
      </ul>
    </nav>

    <div class="px-3 pb-3 mt-3 bg-white border rounded shadow">
      <div class="flex flex-wrap" :class="{ 'lg:justify-end': isClient, 'justify-between': isAdmin || isOperator }">
        <b-button v-if="isAdmin || isOperator" class="mt-3" type="is-primary" @click="onCreate">
          <fa-icon class="mr-2 fa-fw" icon="plus"></fa-icon>
          Добавить
        </b-button>

        <div class="mt-3">
          <b-field class="control">
            <b-select v-model="filter">
              <option value="all">Все</option>
              <option value="accepted">Принятые</option>
            </b-select>

            <b-input
              v-model="search"
              placeholder="Поиск"
            >
            </b-input>
          </b-field>
        </div>
      </div>

      <b-table v-if="!loading" class="mt-3" :data="data">
        <template #default="{ row }">
          <b-table-column
            label="ID"
            width="40"
            numeric
          >
            {{ row.id }}
          </b-table-column>

          <b-table-column label="ФИО абонента">
            <div class="flex items-center justify-between">
              {{ row.fullname }}

              <span v-show="oneDayHasPassed(row.createdAt)" class="p-1 text-xs font-bold text-white bg-red-500 rounded-md">
                > 24ч
              </span>
            </div>
          </b-table-column>

          <b-table-column label="Номер телефона">
            <div class="flex items-center">
              <template v-if="isClient">
                <b-button
                  v-if="row.phone.includes('xxx')"
                  type="is-primary"
                  outlined
                  @click="onAccept(row.id)"
                >
                  {{ row.phone }}
                </b-button>

                <b-button
                  v-else
                  type="is-light"
                >
                  <a :href="`tel:${row.phone}`" class="underline">{{ row.phone }}</a>
                </b-button>

                <span class="ml-2 text-xs">{{ `Принято: ${row.acceptedByUsersCount}` }}</span>
              </template>

              <template v-else>
                <a :href="`tel:${row.phone}`" class="underline">{{ row.phone }}</a>
                <b-button
                  class="ml-2 text-xs"
                  type="is-primary"
                  outlined
                  @click="onList(row.users)"
                >
                  {{ `Принято: ${row.users.length}` }}
                </b-button>
              </template>
            </div>
          </b-table-column>

          <b-table-column label="Местонахождение">
            {{ row.address }}
          </b-table-column>

          <b-table-column label="Действия">
            <div>
              <b-button type="is-text" @click="onShow($_.cloneDeep(row))">
                <fa-icon class="fa-fw" icon="eye"></fa-icon>
              </b-button>

              <b-dropdown v-if="isAdmin || isOperator" position="is-bottom-left">
                <b-button slot="trigger" type="is-text">
                  <fa-icon class="fa-fw" icon="ellipsis-h"></fa-icon>
                </b-button>

                <b-dropdown-item tag="button" @click="onEdit($_.cloneDeep(row))">
                  <fa-icon class="mr-2 fa-fw" icon="pen"></fa-icon>
                  Редактирование
                </b-dropdown-item>

                <b-dropdown-item
                  v-if="isAdmin && row.role !== 'ADMIN'"
                  tag="button"
                  @click="onRemove(row.id)"
                >
                  <fa-icon class="mr-2 fa-fw" icon="times"></fa-icon>
                  Удалить обращение
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </b-table-column>
        </template>

        <template #empty>
          <section class="section">
            <div class="text-center text-gray-700 content">
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

    <b-modal :active.sync="active" has-modal-card @close="onClose">
      <div v-if="active" class="px-2">
        <FormAppeal
          v-if="type === 'create' || type === 'edit'"
          :title="title"
          :entity="entity"
          @apply="onClose(); fetch()"
        />
        <InfoUsers
          v-else-if="type === 'list'"
          :title="title"
          :data="users"
        />
        <InfoAppeal
          v-else
          :title="title"
          :entity="entity"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { differenceInHours, parseISO } from 'date-fns'
import { debounce } from 'lodash-es'
import { mapGetters } from 'vuex'
import FormAppeal from '~/components/FormAppeal'
import InfoAppeal from '~/components/InfoAppeal'
import InfoUsers from '~/components/InfoUsers'

export default {
  components: {
    FormAppeal,
    InfoAppeal,
    InfoUsers,
  },
  data () {
    return {
      loading: true,
      data: [],
      users: [],
      total: 0,
      active: false,
      title: '',
      type: '',
      entity: null,
      current: 1,
      perPage: 10,
      filter: 'all',
      search: '',
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
    search: debounce(function () {
      this.current = 1
      this.fetch()
    }, 250)
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

      if (this.search) {
        params.search = this.search
      }

      const data = await this.$axios.$get('appeals', { params })
      this.data = data.results
      this.total = data.total
      this.loading = false
    },
    onAccept (id) {
      this.$buefy.dialog.confirm({
        title: 'Принять обращение',
        message: 'Вы действительно хотите принять данное обращение?',
        cancelText: 'Отмена',
        confirmText: 'Принять',
        onConfirm: () => {
          this.$axios.$post('appeals/accept', { id })
            .then(() => {
              this.$buefy.notification.open({
                type: 'is-success',
                message: 'Обращение принято',
              })

              this.fetch()
              this.$auth.fetchUser()
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
    onList (users) {
      this.active = true
      this.title = 'Список адвокатов'
      this.type = 'list'
      this.users = users
    },
    onCreate () {
      this.active = true
      this.title = 'Создание обращения'
      this.type = 'create'
      this.entity = {}
    },
    onEdit (entity) {
      this.active = true
      this.title = 'Редактирование обращения'
      this.type = 'edit'
      this.entity = entity
    },
    onShow (entity) {
      this.active = true
      this.title = 'Просмотр обращения'
      this.type = 'show'
      this.entity = entity
    },
    onClose () {
      this.active = false
      this.title = ''
      this.type = ''
      this.users = []
      this.entity = null
    },
    async onRemove (appealId) {
      await this.$axios.$delete(`/appeals/${appealId}/hard`)
      await this.fetch()
    },
    pageChange (page) {
      this.current = page
      this.fetch()
    },
    oneDayHasPassed (createdDate) {
      return differenceInHours(new Date(), parseISO(createdDate))
    }
  },
  head () {
    return {
      title: 'Обращения'
    }
  }
}
</script>

<style>

</style>
