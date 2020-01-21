import {login} from '../../api/user'
import { SET_USERINFO, SET_TOKEN, SET_ROLES } from '../types'

const state = {
  userInfo: null,
  token: '',
  roles: [],
}

const mutations = {
  [SET_USERINFO]: (state, data) => {
    state.userInfo = data
  },
  [SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [SET_ROLES]: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, userInfo) {
    const username = userInfo.username.trim()
    const password = userInfo.password.trim()

    return new Promise((resolve, reject) => {
      login({username, password}).then(response => {
        if (response) {
          console.log('response: ', response)
          const { token } = response
          commit(SET_TOKEN, token)
          resolve(token)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit }, state) {

  }
}

export default {
  state,
  actions,
  mutations
}