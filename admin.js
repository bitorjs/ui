import "normalize.css";
import VueApplication from './inject';
import Start from './admin/view/start';

let client = app => {
  app.watch(require.context('./admin', true, /^((?!\/view\/).)+\.(vue|js)$/));
  app.on('ready', () => {
    console.log('admin ready')
  })
}

new VueApplication({
  // mode: 'history'
}).start(client, Start, '#root');