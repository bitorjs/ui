import "normalize.css";
// import '@babel/polyfill';
import VueApplication from './inject';
import Start from './app/view/start';
import ui from './packages';

let appSource = require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/) // 深层子目前在开发环境没有问题，但打包即生产环境时会识别不到子目录文件
let client = app => {
  app.registerRequireContext(appSource, true);

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