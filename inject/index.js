import 'reflect-metadata';
import Vue from 'vue'
import decorators from 'bitorjs-decorators';
import Application from 'bitorjs-application'
import directives from './directive';
import Vuex from './vuex';

const _services = [];
export default class extends Application {
  constructor(options = {}) {
    super(options)


    this.mountVue();
    this.createDirectives(this, Vue);

    this.use((ctx) => {
      ctx.params = {};
      let arr = ctx.url.split('?')
      let routes = this.match(arr[0]);
      console.log(routes)
      let route = routes[0];
      if (route) {
        ctx.params = route.params;
        route.handle(route.params, ctx.url)
      }
    })

    this.beforeEach((to, from, next) => {
      let vn = this.$vue._upvn;
      if (vn && vn.$options && vn.$options.beforeRouteLeave) {
        vn.$options.beforeRouteLeave.call(vn, to, from, next)
      } else {
        next()
      }
    })
  }

  mountVue() {
    Vue.prototype.$bitor = this;
    this.ctx.render = (webview, props) => {
      props = props || {}
      props.ref = 'innerPage';
      this.$vue.webview = webview;
      this.$vue.props = props;
      this.$vue.__update = 0;
    }
    decorators.methods.forEach((method) => {
      this.ctx[method] = Vue.prototype[method] = (url) => {
        let routes = this.match(url, method);
        console.log(routes)
        let route = routes[0];
        if (route && !route.params['0']) {
          return route.handle(route.params, url, method)
        } else {
          return null;
        }
      }
    })
  }

  createVueRoot(vueRootComponent, htmlElementId) {

    const innerPage = {
      name: 'webview-container',
      render(h) {
        let vn = null;
        if (Object.prototype.toString.call(this.$root.webview) === '[object String]') {
          vn = h('span', this.$root.webview, {
            props: this.$root.props,
            ref: '_upvn'
          });
        } else {
          vn = h(this.$root.webview, {
            props: this.$root.props,
            ref: '_upvn'
          });
        }

        // console.log()
        this.$root._upvn = vn.context && vn.context.$refs._upvn;
        return vn;
      }
    }

    Vue.component(innerPage.name, innerPage);

    return new Vue({
      el: htmlElementId,
      data() {
        return {
          webview: null,
          props: null
        }
      },
      render: h => h(vueRootComponent ? vueRootComponent : innerPage)
    })
  }

  createDirectives(app, Vue) {
    directives(app, Vue);
  }

  start(client, htmlElementId, vueRootComponent) {
    htmlElementId = htmlElementId || '#root';
    this.registerPlugin(client)
    this.emit('ready');
    this.$vue = this.createVueRoot(vueRootComponent, htmlElementId)
    this.emit('vue-mounted');
    this.startServer()
    this.emit('after-server');
  }

  registerService(service) {
    const instance = new service(this.ctx);
    let name = decorators.getServiceName(service);
    if (name) {
      if (_services.indexOf(name) === -1) {
        _services.push(name)
        this.ctx.Service = this.ctx.Service || {};
        this.ctx.Service[name] = instance;
      } else {
        throw new Error(`Service [${name}] has been declared`)
      }
    } else {
      console.error('Service ', service, 'use @Service(name)')
    }
  }


  registerController(controller) {
    const instance = new controller(this.ctx)

    decorators.iterator(controller, (prefix, subroute) => {
      let path;
      if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
        subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
        subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
        path = `${prefix.path}${subroute.path}`
      } else {
        path = `${subroute.path}`
      }

      console.log(path)
      this.registerRoute(path, {
        method: subroute.method.toLowerCase()
      }, instance[subroute.prototype].bind(instance))
    })
  }

  registerStore(store) {
    let s = store(Vuex.Store);
    this.store = s;
  }

  registerRequireContext(requireContext) {
    return requireContext.keys().map(key => {
      console.log(key)
      let m = requireContext(key);
      let c = m.default || m;
      if (key.match(/\/component\/.*\.vue$/) != null) {
        this.registerComponent(c);
      } else if (key.match(/\/controller\/.*\.js$/) != null) {
        this.registerController(c);
      } else if (key.match(/\/service\/.*\.js$/) != null && this.config && this.config.mock !== true) {
        this.registerService(c);
      } else if (key.match(/\/mock\/.*\.js$/) != null && this.config && this.config.mock === true) {
        this.registerService(c);
      } else if (key.match(/\/store\/.*\.js$/) != null) {
        this.registerStore(c);
      }
    })
  }

  registerComponent(component) {
    if (!(component instanceof Object)) {
      throw new TypeError('component must be Vue instance')
    }

    Vue.component(component.name, component);
  }

  pos(){
    
  }

  registerPlugin(plugin) {
    const modules = [];

    this.config = this.config || {};
    const configs = require.context('../config', false, /\.js$/)
    configs.keys().map(key => {
      let m = configs(key);
      let c = m.default || m;

      if (key.match(/\/plugin\.js$/) != null) {
        c.forEach(item => {
          if (item.enable === true) modules.push(item);
        })
      } else {
        this.config = Object.assign(this.config, c)
      }
    })
    plugin(this);
    modules.forEach(m => {
      m.module(this, m)
    })
  }
}