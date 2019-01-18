import "normalize.css";
import VueApplication from './inject';
import Start from './app/view/start';
import ui from './packages';

let appSource = require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/)
let client = app => {
  app.registerRequireContext(appSource);

  app.beforeEach((to, from, next) => {
    next()
  })

  app.afterEach((to, from, next) => {
    next(-1)
  })

  app.on('ready', () => {

  })
}

new VueApplication({
  // mode: 'history'
}).start(client, null, Start);