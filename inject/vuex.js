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

let _namespace = '',
  storeProxy = null,
  commit = null;
class Store extends Vuex.Store {
  static instance = null;
  constructor(options = {}, namespace) {
    options = generOption(options)
    if (Store.instance == null) {
      Store.instance = super(generOption({
        plugins: [vuexLocal.plugin]
      }))
      Vue.prototype.$store = Store.instance;

      commit = Store.instance.commit;
      Store.instance.commit = function (type, payload, options) {
        type = type.split('/').pop()
        commit.call(Store.instance, `${_namespace}${type}`, payload, options) //
      }

      let dispatch = Store.instance.dispatch;
      Store.instance.dispatch = function (type, payload) {
        dispatch.call(Store.instance, `${_namespace}${type}`, payload)
      }

      storeProxy = new Proxy(Store.instance, {
        get: function (obj, prop) {
          if (prop in obj) {
            if (prop === 'getters') {
              return new Proxy(obj[prop], {
                get: function (obj, prop) {
                  return obj[`${_namespace}${prop}`];
                }
              })
            } else {
              return obj[prop];
            }
          } else {
            if (prop === 'root') {
              _namespace = ''
            } else {
              _namespace = `${prop}/`;
            }

            return storeProxy;
          }
        }
      })
    }

    options.namespaced = true;
    Store.instance.registerModule(namespace, options);

    return storeProxy;
  }

  setItem(key, value) {
    commit(`${_namespace}SYS:SET`, {
      key,
      value
    })
    _namespace = ''
  }
}

Vuex.Store = Store;
Vue.use(Vuex);
export default Vuex;