import Vuex from 'vuex'

class Store extends Vuex.Store {
  constructor(options = {}) {
    options['mutations']['SYS:SET'] = function (state, payload) {
      state.count++;
      console.log(payload)
    }
    super(options);

    console.log(this)
  }

  setItem(key, value) {
    this.commit('SYS:SET', key, value)
    // this.commit(type, payload, options)
    // console.log(this._modules['root']['state'].count++)
  }

  pushItem(key, value) {

  }

  getItem(key) {

  }
}

Vuex.Store = Store;

export default Vuex;