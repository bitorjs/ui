let appSource = require.context('./app', true, /\.vue|js$/)
const client = app => {
  app.on('ready', () => {
    app.registerRequireContext(appSource);
  })

}

export default client;