import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import * as actions from './actions'
import getters from './getters'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: debug,
  actions,
  getters,
  modules: {
    user,
  }
})
