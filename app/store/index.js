import Vuex from '../../inject/store';
import Vue from 'vue';
// import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0
  }
});
Vue.prototype.$store = store;
export default store;