import "normalize.css";
import Vue from 'vue';
import VueApplication from './inject';
import Start from './app/view/start';
import ui from './packages';
Vue.use(ui);

let client = app => {
  app.watch(require.context('./config', false, /\.js$/))
  app.watch(require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/));
  
  
  // app.beforeEach((to, from, next) => {
  //   Toast.loading({ mask: true, message: "loading" + "..." });
  //   import('./app/view/src/sketeton').then(res=>{
  //     app.ctx.render(res.default)
  //     next()
  //   })
  //   next()
  // })

  // app.afterEach((to, from, next) => {
  //   next()
  //   Toast.close()
  // })

  app.on('ready', () => {
    console.warn('app ready', app.nipi)
  })
}

new VueApplication({
  // mode: 'hash'
}).start(client, Start);