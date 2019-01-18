import "normalize.css";
import VueApplication from './inject';
import Start from './admin/view/start';



let appSource = require.context('./admin', true, /^((?!\/view\/).)+\.(vue|js)$/)
let client = app => {
  app.registerRequireContext(appSource, config.mock);

  app.on('ready', () => {

  })
}

new VueApplication({
  // mode: 'history'
}).start(client, '#admin', Start);