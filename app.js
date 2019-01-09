import "normalize.css";
import VueApplication from './inject';
// import classloader from './.classloader';
import Start from './app/view/start';
import ui from './packages';
import Vue from 'vue';
import store from './app/store/index';
import env from './config/env';
import plugin from 'ui-test';


let appSource = require.context('./app', true, /\.vue|js$/) // 深层子目前在开发环境没有问题，但打包即生产环境时会识别不到子目录文件

let client = app => {
  // let ctrls = require.context('./app/controllers', false, /\.js$/)
  // let comps = require.context('./app/components', false, /\.vue$/)
  app.config = env;
  app.store = store;
  app.registerRequireContext(appSource);
  app.registerPlugin(plugin)
  // plugins.forEach(plugin => {
  //   // app.registerPlugin(require(`node_modules/${plugin}`).default);
  // })

  app.on('ready', () => {

    // 自动注入 controller
    // const ctrls = classloader['controllers'];
    // for (const key in ctrls) {
    //   if (ctrls.hasOwnProperty(key)) {
    //     const c = ctrls[key];
    //     app.registerController(c);
    //   }
    // }

    // appSource.keys().map((key) => {
    // let c = appSource(key).default;
    // if (key.match(/components\/.*\.vue$/) != null) {
    //   app.registerComponent(c);
    // } else if (key.match(/controllers\/.*\.js$/) != null) {
    //   app.registerController(c);
    // }
    // })

    // requireAll(appSource, app)



    // ctrls.keys().map((key) => {
    //   const c = ctrls(key).default;
    //   app.registerController(c);
    //   console.log('/33', c)
    // })

    // comps.keys().map((key) => {
    //   const c = comps(key).default;
    //   app.registerComponent(c);
    //   console.log('/33', c)
    // })

    // // 自动注入 全局组件
    // const comps = classloader['components'];
    // for (const key in comps) {
    //   if (comps.hasOwnProperty(key)) {
    //     const c = comps[key];
    //     app.registerComponent(c);
    //   }
    // }




    Vue.use({
      install(Vue) {
        Object.keys(ui).forEach(item => {
          Vue.component(item, ui[item])
        });
      }
    })



    // 
  })

}

new VueApplication({
  // mode: 'history'
}).start(client, null, Start);