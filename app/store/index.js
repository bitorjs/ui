import Vuex from '../../inject/store';
import Vue from 'vue';
// import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increate(state, payload) {
      state.count++;
    }
  },
  modules: {
    a: {
      mutations: {
        ffa(state, payload) {
          state.count++;
        }
      },
    }
  }
});
Vue.prototype.$store = store;
export default store;