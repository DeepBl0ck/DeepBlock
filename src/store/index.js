import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// state는 변수
// mutations 변수를 조작하는 함수

export default new Vuex.Store({
  state: {
    compoState: "null",
    layerState: "null"
  },
  mutations: {
    inputParameter(state, payload) {
      state.layerState = payload
      console.log(state.layerState)
    },
    changeCompo(state){
      state.compoState = " "
    }
  },
  actions: {
  },
  modules: {
  }
})