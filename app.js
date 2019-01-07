import "normalize.css";
import VueApplication from './inject';
// import classloader from './.classloader';
import Start from './app/view/start';
import ui from './packages';
import Vue from 'vue';
import store from './app/store/index';
import env from './config/env';
import plugin from 'ui-test/index';

let ctrls = require.context('./app/controllers', false, /\.js$/)
let comps = require.context('./app/components', false, /\.vue$/)

// let appSource = require.context('./app', true, /\.vue|js$/) // 深层子目前在开发环境没有问题，但打包即生产环境时会识别不到子目录文件
// let requireAll = requireContext => requireContext.keys().map(key => {
//   requireContext(key).default;
//   console.log()
// })
// requireAll(appSource)

let client = app => {
  app.on('ready', () => {
    app.config = env;
    app.store = store;
    // 自动注入 controller
    // const ctrls = classloader['controllers'];
    // for (const key in ctrls) {
    //   if (ctrls.hasOwnProperty(key)) {
    //     const c = ctrls[key];
    //     app.registerController(c);
    //   }
    // }

    // appSource.keys().map((key) => {
    //   let c = appSource(key).default;
    //   if (key.match(/components\/.*\.vue$/) != null) {
    //     app.registerComponent(c);
    //   } else if (key.match(/controllers\/.*\.js$/) != null) {
    //     app.registerController(c);
    //   }
    // })


    ctrls.keys().map((key) => {
      const c = ctrls(key).default;
      app.registerController(c);
    })

    // // 自动注入 全局组件
    // const comps = classloader['components'];
    // for (const key in comps) {
    //   if (comps.hasOwnProperty(key)) {
    //     const c = comps[key];
    //     app.registerComponent(c);
    //   }
    // }

    comps.keys().map((key) => {
      const c = comps(key).default;
      app.registerComponent(c);
    })


    Vue.use({
      install(Vue) {
        Object.keys(ui).forEach(item => {
          Vue.component(item, ui[item])
        });
      }
    })


    app.registerPlugin(plugin);
  })
}

new VueApplication({
  // mode: 'history'
}).start(client, null, Start);