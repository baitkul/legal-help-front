<template>
  <div>
    <div class="font-bold uppercase lg:text-2xl">Пользователи</div>

    <div class="mt-3 border bg-white px-3 pb-3 rounded shadow">
      <div class="flex flex-wrap justify-between">
        <b-button class="mt-3" type="is-primary" @click="onCreate">
          <fa-icon class="fa-fw mr-1" icon="plus"></fa-icon>
          <span class="font-bold">Добавить</span>
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

      <b-table class="mt-3" :data="data">
        <template #default="{ row }">
          <b-table-column
            label="ID"
            width="40"
            numeric
          >
            {{ row.id }}
          </b-table-column>

          <b-table-column label="Эл. почта">
            {{ row.email }}
          </b-table-column>

          <b-table-column label="ФИО">
            {{ row.fullname }}
          </b-table-column>

          <b-table-column label="Роль">
            <b-tag type="is-light">
              <span class="font-bold">
                {{ getRoles.find(role => role.value === row.role).label.toUpperCase() }}
              </span>
            </b-tag>
          </b-table-column>

          <b-table-column label="Дата регистрации">
            <b-tag type="is-light">
              <span class="font-bold">
                {{ format(row.createdAt) }}
              </span>
            </b-tag>
          </b-table-column>

          <b-table-column label="Действия">
            <div>
              <b-button
                type="is-text"
                @click="onactive($_.cloneDeep(row))"
              >
                <fa-icon class="fa-fw" icon="eye"></fa-icon>
              </b-button>

              <b-button
                v-if="(isAdmin && row.role !== 'ADMIN') || (isOperator && row.role === 'CLIENT')"
                type="is-text"
                @click="onEdit($_.cloneDeep(row))"
              >
                <fa-icon class="fa-fw" icon="pen"></fa-icon>
              </b-button>
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

    <b-modal :active.sync="active" @close="onClose">
      <div v-if="active" class="px-3">
        <FormUser
          v-if="type === 'create' || type === 'edit'"
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
import FormUser from '~/components/FormUser'
import InfoUser from '~/components/InfoUser'

export default {
  middleware: 'users',
  components: {
    FormUser,
    InfoUser,
  },
  data () {
    return {
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
    },
    format (date) {
      return format(new Date(date), 'dd.MM.yyyy HH:mm:ss')
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
    onactive (entity) {
      this.active = true
      this.title = 'Просмотр пользователя'
      this.type = 'active'
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
