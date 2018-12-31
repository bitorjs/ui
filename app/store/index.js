import Vuex from '../../inject/store';
import Vue from 'vue';
// import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store('ttt', {
  state: {
    count: 0,
    // data: []
  },
  mutations: {
    increate(state, payload) {
      state.count++;
    }
  },
  actions: {
    increment(context) {
      // context.commit('increment')
      console.log(context)
    }
  }
});

new Vuex.Store('mmm', {
  state: {
    count: 0,
    // data: []
  },
});

export default store;