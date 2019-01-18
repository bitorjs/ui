const client = app => {
  app.watch(require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/));
  app.on('ready', () => {
    console.log('test ready')
  })
}

export default client;