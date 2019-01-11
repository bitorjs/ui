import "normalize.css";
import VueApplication from './inject';
import Start from './app/view/start';
import ui from './packages';
import store from './app/store/index';
import env from './config/env';
import plugin from 'ui-test';

__webpack_require__.e = () => {}

let appSource = require.context('./app', true, /\.(vue|js)$/) // 深层子目前在开发环境没有问题，但打包即生产环境时会识别不到子目录文件
// let ctls = require.context('./app/controller', false, /\.js$/)
// let ctls = require.context('./app/controller', false, /\.js$/)
// let ctls = require.context('./app/controller', false, /\.js$/)

let client = app => {
  app.config = env;
  app.store = store;
  app.registerRequireContext(appSource);
  app.registerPlugin(plugin)


  app.on('ready', () => {


  })
}

new VueApplication({
  // mode: 'history'
}).start(client, null, Start);