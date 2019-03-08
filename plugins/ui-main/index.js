
export default app => {
  app.watch(require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/));
}