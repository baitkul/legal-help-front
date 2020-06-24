import Vue from 'vue'
import {
  Button,
  Dialog,
  Dropdown,
  Field,
  Input,
  Radio,
  Select,
  Icon,
  Modal,
  Navbar,
  Notification,
  Pagination,
  Table,
  Tag,
} from 'buefy'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Dropdown)

// Form controls
Vue.use(Field)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Select)

Vue.use(Icon, {
  defaultIconComponent: 'fa-icon',
  defaultIconPack: 'fas',
})
Vue.use(Modal)
Vue.use(Navbar)
Vue.use(Notification)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(Tag)
