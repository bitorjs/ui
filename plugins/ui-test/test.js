let appSource = require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/)
const client = app => {
  app.on('ready', () => {
    app.registerRequireContext(appSource);
  })

}

export default client;