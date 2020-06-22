<template>
  <div>
    <div class="font-bold uppercase lg:text-2xl">Обращения</div>

    <div class="mt-3 border bg-white px-3 pb-3 rounded shadow">
      <div class="flex flex-wrap" :class="{ 'justify-end': isClient, 'justify-between': !isClient }">
        <b-button v-if="!isClient" class="mt-3" type="is-primary" @click="onCreate">
          <fa-icon class="fa-fw mr-1" icon="plus"></fa-icon>
          <span class="font-bold">Добавить</span>
        </b-button>

        <div class="mt-3">
          <b-field class="control">
            <b-select v-model="filter" placeholder="Select a name">
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

      <b-table class="mt-3" :data="data">
        <template #default="{ row }">
          <b-table-column
            label="ID"
            width="40"
            numeric
          >
            {{ row.id }}
          </b-table-column>

          <b-table-column label="ФИО абонента">
            {{ row.fullname }}
          </b-table-column>

          <b-table-column label="Номер телефона">
            <template v-if="isClient">
              <b-button
                v-if="row.phone.includes('xxx')"
                type="is-primary"
                @click="onAccept(row.id)"
              >
                {{ row.phone }}
              </b-button>

              <template v-else>
                {{ row.phone }}
              </template>
            </template>

            <template v-else-if="isAdmin || isOperator">
              <b-button
                type="is-primary"
                @click="onList(row.users)"
              >
                {{ `${row.phone} (${row.users.length} выбр.)` }}
              </b-button>
            </template>
          </b-table-column>

          <b-table-column label="Местонахождение">
            {{ row.address }}
          </b-table-column>

          <b-table-column label="Действия">
            <div>
              <b-button
                type="is-text"
                @click="onShow($_.cloneDeep(row))"
              >
                <fa-icon class="fa-fw" icon="eye"></fa-icon>
              </b-button>

              <b-button
                v-if="isAdmin"
                type="is-text"
                @click="onEdit($_.cloneDeep(row))"
              >
                <fa-icon class="fa-fw" icon="pen"></fa-icon>
              </b-button>
            </div>
          </b-table-column>
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
        filter: this.filter
      }

      if (this.search) {
        params.search = this.search
      }

      const data = await this.$axios.$get('appeals', { params })
      this.data = data.results
      this.total = data.total
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
            })
            .catch(() => {})
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
    pageChange (page) {
      this.current = page
      this.fetch()
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
