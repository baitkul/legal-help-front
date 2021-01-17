<template>
  <div>
    <nav class="breadcrumb">
      <ul>
        <li class="is-active">
          <nuxt-link to="/">Пользователи</nuxt-link>
        </li>
      </ul>
    </nav>

    <div class="px-3 pb-3 mt-3 bg-white border rounded shadow">
      <div class="flex flex-wrap justify-between">
        <b-button class="mt-3" type="is-primary" @click="onCreate">
          <fa-icon class="mr-2 fa-fw" icon="plus"></fa-icon>
          Добавить
        </b-button>

        <div class="mt-3">
          <b-field class="control">
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

          <b-table-column label="ФИО">
            <div class="flex flex-col">
              {{ row.fullname }}
              <div class="mt-1 text-xs text-gray-700">{{ row.email }}</div>
            </div>
          </b-table-column>

          <b-table-column label="Баланс">
            {{ row.role === 'CLIENT' ? row.balance ? row.balance : 0 : '-' }}
          </b-table-column>

          <b-table-column label="Роль">
            <b-tag class="font-bold is-light">
              {{ getRoles.find(role => role.value === row.role).label.toUpperCase() }}
            </b-tag>
          </b-table-column>

          <b-table-column label="Дата регистрации">
            <b-tag class="font-bold is-light">
              {{ format(row.createdAt) }}
            </b-tag>
          </b-table-column>

          <b-table-column label="Действия">
            <div>
              <b-button type="is-text" @click="onShow($_.cloneDeep(row))">
                <fa-icon class="fa-fw" icon="eye"></fa-icon>
              </b-button>

              <b-dropdown position="is-bottom-left">
                <b-button slot="trigger" type="is-text">
                  <fa-icon class="fa-fw" icon="ellipsis-h"></fa-icon>
                </b-button>

                <b-dropdown-item
                  v-if="(isAdmin && row.role !== 'ADMIN') || (isOperator && row.role === 'CLIENT')"
                  tag="button"
                  @click="onEdit($_.cloneDeep(row))"
                >
                  <fa-icon class="mr-2 fa-fw" icon="pen"></fa-icon>
                  Редактирование
                </b-dropdown-item>

                <b-dropdown-item
                  v-if="row.role === 'CLIENT'"
                  tag="button"
                  @click="onBalance($_.cloneDeep(row))"
                >
                  <fa-icon class="mr-2 fa-fw" icon="wallet"></fa-icon>
                  Пополнение баланса
                </b-dropdown-item>

                <b-dropdown-item
                  v-if="isAdmin && row.role !== 'ADMIN'"
                  tag="button"
                  @click="onRemove(row.id)"
                >
                  <fa-icon class="mr-2 fa-fw" icon="times"></fa-icon>
                  Удалить пользователя
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
        <FormUser
          v-if="type === 'create' || type === 'edit'"
          :title="title"
          :entity="entity"
          @apply="onClose(); fetch()"
        />
        <FormBalance
          v-else-if="type === 'balance'"
          :title="title"
          :entity="entity"
          @apply="onClose(); fetch()"
        />
        <InfoUser
          v-else
          :title="title"
          :entity="entity"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { debounce } from 'lodash-es'
import { mapGetters } from 'vuex'
import FormBalance from '~/components/FormBalance'
import FormUser from '~/components/FormUser'
import InfoUser from '~/components/InfoUser'

export default {
  middleware: 'users',
  components: {
    FormBalance,
    FormUser,
    InfoUser,
  },
  data () {
    return {
      loading: true,
      data: [],
      total: 0,
      active: false,
      title: '',
      type: '',
      entity: null,
      current: 1,
      perPage: 10,
      search: '',
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'isOperator',
      'isClient',
      'getUser',
      'getRoles',
    ])
  },
  watch: {
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
        pageSize: this.perPage
      }

      if (this.search) {
        params.search = this.search
      }

      const data = await this.$axios.$get('users', { params })
      this.data = data.results
      this.total = data.total
      this.loading = false
    },
    format (date) {
      return format(new Date(date), 'dd.MM.yyyy HH:mm:ss')
    },
    onBalance (entity) {
      this.active = true
      this.title = 'Пополнение баланса'
      this.type = 'balance'
      this.entity = entity
    },
    onCreate () {
      this.active = true
      this.title = 'Создание пользователя'
      this.type = 'create'
      this.entity = {}
    },
    onEdit (entity) {
      this.active = true
      this.title = 'Редактирование пользователя'
      this.type = 'edit'
      this.entity = entity
    },
    onShow (entity) {
      this.active = true
      this.title = 'Просмотр пользователя'
      this.type = 'show'
      this.entity = entity
    },
    onClose () {
      this.active = false
      this.title = ''
      this.type = ''
      this.entity = null
    },
    pageChange (page) {
      this.current = page
      this.fetch()
    },
    async onRemove (userId) {
      await this.$axios.$delete(`/users/${userId}`)
      await this.fetch()
    }
  },
  head () {
    return {
      title: 'Пользователи'
    }
  }
}
</script>

<style>

</style>
