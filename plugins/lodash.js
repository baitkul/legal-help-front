import Vue from 'vue'
import {
  sampleSize,
  cloneDeep,
  isNil,
  omit,
  omitBy,
  get,
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
  get,
}
