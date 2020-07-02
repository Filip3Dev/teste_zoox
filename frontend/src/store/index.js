import Vue from 'vue'
import Vuex from 'vuex'
import api from "../plugins/snippet"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    estados: null,
  },
  mutations: {
    listEstados(state, payload) {
      state.estados = payload;
    }
  },
  actions: {
    listEstados ({ commit }, payload) {
      try {
        console.log('payload: ', payload);
        api.listEstados(payload)
        .then(answer => {
          commit('listEstados', answer.data);
        })
      } catch (e) {
        console.log("Don't works: ", e);
      }
    }
  },
  modules: {
  }
})
