import Vue from 'vue'
import Vuex from 'vuex'

const TOKEN_KEY = 'TNEWS_USER'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: window.localStorage.getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
