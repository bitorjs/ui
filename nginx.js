import "normalize.css";
import Vue from 'vue';
import VueApplication from './inject';
import ui from './packages';
Vue.use(ui);

let client = app => {
  app.watch(require.context('./app-nginx', true, /^((?!\/(view|lib)\/).)+\.(vue|js)$/));
  app.on('ready', () => {
    console.log('nginx ready')
  })
}

new VueApplication({
  // mode: 'history'
}).start(client, null, '#root');