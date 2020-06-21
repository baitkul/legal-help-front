<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="font-bold uppercase lg:text-2xl">Пользователи</div>

      <b-button type="is-primary" @click="onCreate">
        <fa-icon class="fa-fw mr-1" icon="plus"></fa-icon>
        <span class="font-bold">Добавить</span>
      </b-button>
    </div>

    <div class="mt-3 flex items-center justify-end">
      <b-input
        v-model="search"
        placeholder="Поиск"
      >
      </b-input>
    </div>

    <div class="mt-3 border bg-white lg:p-4 text-xs lg:text-sm rounded shadow">
      <b-table :data="data">
        <template #default="{ row }">
          <b-table-column label="Эл. почта">
            {{ row.email }}
          </b-table-column>

          <b-table-column label="ФИО">
            {{ row.fullname }}
          </b-table-column>

          <b-table-column label="Роль">
            {{ getRoles.find(role => role.value === row.role).label }}
          </b-table-column>

          <b-table-column label="Действия">
            <div>
              <b-button
                type="is-primary"
                size="is-small"
                plain
                @click="onactive($_.cloneDeep(row))"
              >
                <fa-icon class="fa-fw" icon="eye"></fa-icon>
              </b-button>

              <b-button
                v-if="(isAdmin && row.role !== 'ADMIN') || (isOperator && row.role === 'CLIENT')"
                type="is-primary"
                size="is-small"
                @click="onEdit($_.cloneDeep(row))"
              >
                <fa-icon class="fa-fw" icon="pen"></fa-icon>
              </b-button>
            </div>
          </b-table-column>
        </template>
      </b-table>
    </div>

    <div class="mt-3">
      <b-pagination
        :total="total"
        :per-page="perPage"
        :current.sync="current"
        @change="pageChange"
      >
      </b-pagination>
    </div>

    <b-modal :active.sync="active" @close="onClose">
      <div v-if="active" class="modal-card">
        <header class="modal-card-head">
          <div class="modal-card-title">{{ title }}</div>
        </header>

        <FormUser v-if="type === 'create' || type === 'edit'" :entity="entity" @apply="onClose(); fetch()" />
        <InfoUser v-else :entity="entity" />
      </div>
    </b-modal>
  </div>
</template>

<script>
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
