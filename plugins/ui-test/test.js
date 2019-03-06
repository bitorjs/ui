const client = (app, options) => {
  const ip = options.ip;
  const user = options.user;

  app.watch(require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/));
  app.on('ready', () => {
    console.log('test ready')
    app.$store.gggg.setItem('ip', ip || '192.168.1.1')
    app.$store.gggg.setItem('user1', 1)
    app.$store.gggg.setItem('user2', 2)
    app.$store.gggg.setItem('user3', 3)
    app.$store.gggg.setItem('user4', 4)
    app.$store.gggg.qs('a[b][c][d][e]=4')
    app.$store.gggg.qs('x[0]=b&x[1]=&x[2]=c')
    app.$store.gggg.assign({
      info: {
        a: 1,
        b: 1,
        c: 1
      }
    })
    console.log('updateIp', app.$store.gggg.getters.updateIp)
    app.$store.gggg.dispatch('setIp', '192.168.2.2')
  })
}

export default client;