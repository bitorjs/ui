import "normalize.css";
import Vue from 'vue';
import VueApplication from './inject';
import Start from './app/view/start';
import ui from './packages';
Vue.use(ui);
// let name = 'ui-test/index';
// try {
// let r = require(`${name}.js`);
// console.log(r)  
// } catch (error) {
//   console.error(error)
// }


let client = app => {
  app.watch(require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/));
  app.beforeEach((to, from, next) => {
    next()
  })

  app.afterEach((to, from, next) => {
    next()
  })

  app.on('ready', () => {
    console.warn('app ready', app.nipi)
  })
}

new VueApplication({
  // mode: 'hash'
}).start(client, Start);