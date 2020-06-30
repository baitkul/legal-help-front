import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faCalendarAlt,
  faCheck,
  faCog,
  faEllipsisH,
  faEnvelope,
  faExchangeAlt,
  faExclamationCircle,
  faEye,
  faFileAlt,
  faFrown,
  faHistory,
  faIdCard,
  faInfo,
  faMapMarkerAlt,
  faPen,
  faPhoneAlt,
  faPlus,
  faRandom,
  faSignOutAlt,
  faTimes,
  faUser,
  faUserCircle,
  faUserFriends,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faAngleLeft)
library.add(faAngleRight)
library.add(faCalendarAlt)
library.add(faCheck)
library.add(faCog)
library.add(faEllipsisH)
library.add(faEnvelope)
library.add(faExchangeAlt)
library.add(faExclamationCircle)
library.add(faEye)
library.add(faFileAlt)
library.add(faFrown)
library.add(faHistory)
library.add(faIdCard)
library.add(faInfo)
library.add(faMapMarkerAlt)
library.add(faPen)
library.add(faPhoneAlt)
library.add(faPlus)
library.add(faRandom)
library.add(faSignOutAlt)
library.add(faTimes)
library.add(faUser)
library.add(faUserCircle)
library.add(faUserFriends)
library.add(faWallet)

// Register the component globally
Vue.component('fa-icon', FontAwesomeIcon)
