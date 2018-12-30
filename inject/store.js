import Vuex from 'vuex'

class Store extends Vuex.Store {
  constructor(options = {}) {
    super(options);

    this._mutations['SYS:SET'] = (state, payload) => {
      // state.count++;
      console.log(state, payload)
    }

  }

  setItem(key, value) {
    // this.commit('SYS:SET')
    // this.commit(type, payload, options)
    console.log(this)
  }

  pushItem(key, value) {

  }

  getItem(key) {

  }
}

Vuex.Store = Store;

export default Vuex;