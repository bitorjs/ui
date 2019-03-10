import "normalize.css";
import Vue from 'vue';
import VueApplication from './inject';
import Start from './app.vue';
import ui from './packages';
Vue.use(ui);

import HashMap from './inject/hashmap';
var map = new HashMap();
map.set("key1", "val1");
map.set("key1", "val2");
map.size; // -> 2

console.log(map.has("key1"))
map.forEach(function(value, key) {
  console.log(key + " : " + value);
});

let client = app => {
  app.watch(require.context('./config', false, /\.js$/))
  
  
  
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