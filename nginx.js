import "normalize.css";
import VueApplication from './inject';

let client = app => {
  app.watch(require.context('./app-nginx', true, /^((?!\/(view|lib)\/).)+\.(vue|js)$/));
  app.on('ready', () => {
    console.log('nginx ready')
  })
}

new VueApplication({
  // mode: 'history'
}).start(client, null, '#nginx');