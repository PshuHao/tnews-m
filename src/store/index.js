// import { from } from 'core-js/fn/array'
import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem, removeItem } from '@/utils/storage'
const TOKEN_KEY = 'TNEWS_USER'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: window.localStorage.getItem(TOKEN_KEY)
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, user) {
      state.user = user

      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    },
    removeUser (state, user) {
      // state.user = ''
      removeItem(TOKEN_KEY)
    }
  },
  actions: {
  },
  modules: {
  }
})
