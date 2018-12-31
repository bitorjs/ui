import Vue from 'vue';
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

function generOption(options) {
  options['mutations'] = options['mutations'] || {}
  options['mutations']['SYS:SET'] = function (state, payload) {
    Vue.set(state, payload.key, payload.value);
  }

  return options;
}

let _namespace = '';
class Store extends Vuex.Store {
  static instance = null;
  constructor(namespace, options = {}) {
    options = generOption(options)
    if (Store.instance == null) {
      Store.instance = super(generOption({
        plugins: [vuexLocal.plugin]
      }))
    }

    options.namespaced = true;
    Store.instance.registerModule(namespace, options);


    let proxy = new Proxy(Store.instance, {
      get: function (obj, prop) {
        if (prop in obj) {
          return obj[prop];
        } else {
          if (prop === 'root') {
            _namespace = ''
          } else {
            _namespace = `${prop}/`;
          }

          return proxy;
        }
      }
    })

    return proxy;
  }



  setItem(key, value) {
    this.commit(`${_namespace}SYS:SET`, {
      key,
      value
    })
    _namespace = ''
  }
}

Vuex.Store = Store;

export default Vuex;