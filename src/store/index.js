import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import avatar from "./avatar";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    compoState: "evalutation",
    layerState: null
  },
  getters: {
    getCompoState: function (state) {
      return state.compoState;
    },
    getLayerState: function (state) {
      return state.layerState
    }
  },
  mutations: {
    setCompo(state, compo) {
      console.log(compo)
      state.compoState = compo;
    },
    setLayer(state, layer) {
      state.layerState = layer;
    },
  },
  actions: {
  },
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