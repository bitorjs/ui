export default {
  state: {
    ip: '',
    user: {}
  },
  getters: {
    updateIp(state) {
      state.time = new Date().getTime()
      return state.time;
    }
  },
  mutations: {
    setIp(state, payload) {
      // console.log(state, payload)
      state.ip = payload;
    }
  },
  actions: {
    setIp(context, payload, options) {
      context.commit('setIp', payload, options)
    }
  }
}