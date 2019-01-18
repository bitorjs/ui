import "normalize.css";
import VueApplication from './inject';
import Start from './app/view/start';
import ui from './packages';
import Toast from "./packages/Toast";

let client = app => {
  app.watch(require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/));

  app.beforeEach((to, from, next) => {
    next()
  })

  app.afterEach((to, from, next) => {
    next()
  })

  app.on('ready', () => {
    console.log('app ready')
  })
}

new VueApplication({
  // mode: 'hash'
}).start(client, null, Start);