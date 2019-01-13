import "normalize.css";
import VueApplication from './inject';
import Start from './app/view/start';
import ui from './packages';
import store from './app/store/index';
import env from './config/env';
import plugin from 'ui-test';

let appSource = require.context('./app', true, /\.(vue|js)$/) // 深层子目前在开发环境没有问题，但打包即生产环境时会识别不到子目录文件

let client = app => {
  app.config = env;
  app.store = store;
  app.registerRequireContext(appSource);
  app.registerPlugin(plugin)

  app.beforeEach((to, from, next) => {
    // 
    // next()
    console.log('!!!!', to, from)
    next(-1)

  })

  app.beforeEach((to, from, next) => {
    // 
    // next()
    console.log('!!!!--', to, from)
    next(-1)

  })

  app.afterEach((to, from, next) => {
    // 
    // next()
    next(-1)
    console.log('@@@@@', to, from)
  })

  app.on('ready', () => {
    console.log(222);
    // app.redirect('/icon')
  })
}

new VueApplication({
  // mode: 'history'
}).start(client, null, Start);