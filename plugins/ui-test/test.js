const ctrls = require.context('./app/controllers', false, /\.js$/)

const client = app => {
  ctrls.keys().map((key) => {
    const c = ctrls(key).default;
    app.registerController(c);
  })

  app.on('ready', () => {
    // app.registerPlugin(client);
  })

}

export default client;