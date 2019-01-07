import "normalize.css";
import VueApplication from './inject';
// import classloader from './.classloader';
import Start from './app/view/start';
import ui from './packages';
import Vue from 'vue';
import store from './app/store/index';
import env from './config/env';


// let requireAll = requireContext => requireContext.keys().map(requireContext)


// try {
//   let req = require.context('./test', false, /\.js$/)
//   let req2 = require.context('./test2', false, /\.js$/)
let req = require.context('./app/controllers', false, /\.js$/)
console.log(req, req.keys(), req("./index.js"), req("./index.js").default)
// console.log(req('index.js'))
// } catch (error) {
//   console.warn(error)
// }console.log(req.keys())
// requireAll(req)



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

    let ctrls = require.context('./app/controllers', false, /\.js$/)
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
    let comps = require.context('./app/components', false, /\.vue$/)
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
  })
}

new VueApplication({
  // mode: 'history'
}).start(client, null, Start);