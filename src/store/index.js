import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    compoState: "evalutation",
    layerState: "null"
  },
  getters: {
    getCompoState: function (state) {
      return state.compoState;
    },
    getLayerState: function (state) {
      return state.layerState
    },
  },
  mutations: {
    setCompo(state, compo) {
      console.log(compo)
      state.compoState = compo;
    },
    setLayer(state, layer) {
      state.layerState = layer;
    }
  },
  actions: {

  },
  modules: {
  }
})