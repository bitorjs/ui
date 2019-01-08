const ctrls = require.context('./app/controllers', false, /\.js$/)

export default app => {
  ctrls.keys().map((key) => {
    const c = ctrls(key).default;
    app.registerController(c);
  })
}