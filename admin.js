import "normalize.css";
import VueApplication from './inject';
import Start from './admin/view/start';
import ui from './packages';

import config from './config/app';

let appSource = require.context('./admin', true, /^((?!\/view\/).)+\.(vue|js)$/) // 深层子目前在开发环境没有问题，但打包即生产环境时会识别不到子目录文件

let client = app => {
  app.config = config;
  app.registerRequireContext(appSource, config.mock);

  app.on('ready', () => {

  })
}

new VueApplication({
  // mode: 'history'
}).start(client, '#admin', Start);