import Vue from 'vue'
import {
  sampleSize,
  cloneDeep,
  isNil,
  omit,
  omitBy,
} from 'lodash-es'

Vue.prototype.$_ = {
  // Collection
  sampleSize,
  // Lang
  cloneDeep,
  isNil,
  // Object
  omit,
  omitBy,
}
