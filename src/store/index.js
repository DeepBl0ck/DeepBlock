import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { avatar } from "./modules/avatar";
import { auth } from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    avatar
  },
  plugins: [
    createPersistedState({
      key: "userinfo",
      paths: ['auth', 'avatar']
    })
  ]
})

export default store;