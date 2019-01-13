import Vuex from '../../inject/store';
import Vue from 'vue';
// import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store('ttt', {
  state: {
    count: 0,
    data: [{
      name: 'loading',
      label: '加载'
    }, {
      name: 'uploader',
      label: '上传'
    }, {
      name: 'icon',
      label: '图标'
    }, {
      name: 'button',
      label: '按钮'
    }, {
      name: 'layout',
      label: '布局'
    }, {
      name: 'cell',
      label: 'Cell'
    }, {
      name: 'navbar',
      label: 'navbar'
    }, {
      name: 'dialog',
      label: '弹框'
    }, {
      name: 'toast',
      label: 'Toast'
    }]
  },
  mutations: {
    increate(state, payload) {
      state.count++;
    }
  },
  actions: {
    increment(context) {
      // context.commit('increment')
      // console.log(context)
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