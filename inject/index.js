import Vue from 'vue'
import decorators from 'bitorjs-decorators';
import Application from 'bitorjs-application'
import compose from 'koa-compose';
import directives from './directive';
import Vuex from './vuex';

var qs = require('qs');

const _filters = new Map();
const _services = new Map();
const _webstore = new Map();
const _controllers = [];
const _middlewares = new Map();
const _modules = [];
export default class extends Application {
  constructor(options = {}) {
    super(options)

    this.ctx.$config = {}
    this.$config = this.ctx.$config;

    this.mountVue();
    this.createDirectives(this, Vue);

    this.use((ctx, next) => {
      ctx.params = {};
      let arr = ctx.url.split('?')
      let routes = this.match(arr[0]);
      console.log(routes)
      let route = routes[0];
      if (route) {
        ctx.params = route.params;
        route.handle(ctx, next)
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
    Vue.prototype.ctx = this.ctx;
    this.ctx.render = (webview, props) => {
      props = props || {}
      props.ref = 'innerPage';
      this.$vue.webview = webview;
      this.$vue.props = props;
      this.$vue.__update = 0;
    }
    decorators.methods.forEach((method) => {
      this.ctx[`$${method}`] = Vue.prototype[`$${method}`] = (url, params) => {
        this.ctx.params = {}
        this.ctx.query = {}
        this.ctx.body = {}
        let urlParts = url.split("?")
        let routes = this.match(urlParts[0], method);
        console.log(routes)
        let route = routes[0];
        if (route && !route.params['0']) {
          this.ctx.params = route.params;
          
          if(urlParts[1]){
            this.ctx.query = Object.assign(this.ctx.query, qs.parse(urlParts[1]))
          }

          if(method === "get"){
            this.ctx.query = Object.assign(this.ctx.query, params);
          } else if(method === "post") {
            this.ctx.body = Object.assign(this.ctx.body, params);
          }
          return route.handle(this.ctx)
        } else {
          return Promise.reject(`未找到路由[${url}]`);
        }
      }
    })
  }

  createVueRoot(vueRootComponent, htmlElementId) {

    const innerPage = {
      name: 'router-view',
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

  start(client, vueRootComponent, htmlElementId) {
    htmlElementId = htmlElementId || '#root';
    this.registerMainClient(client)


    _modules.forEach(m => {
      m.module(this, m)
    })

    this.emit('AppDidSetup')


    this.emit("ControllerWillMount")
     _controllers.map(ctrl=>{
      this.registerController( ctrl)
    })
    this.emit("ControllerMounted")
    this.$vue = this.createVueRoot(vueRootComponent, htmlElementId)
    this.emit('ready');
    this.startServer()
  }

  registerFilter(filename, filter) {
    if (_filters.get(filename) === undefined) {
      _filters.set(filename, filter)
      Vue.filter(filename, filter)
    } else {
      throw new Error(`Fliter [${filename}] has been declared`)
    }
  }

  registerService(filename, service) {
    const instance = new service(this.ctx);
    instance.ctx = this.ctx;
    let name = decorators.getService(service);
    if (name) {
      
      if (_services.has(name)) {
        throw new Error(`Service [${name}] has been declared`)
      } else { 
        _services.set(name, service)
        this.ctx.$service = this.ctx.$service || {};
        this.ctx.$service[name] = instance;
      }
    } else {
      if (_services.has(filename)) {
        throw new Error(`Service [${filename}] has been declared`)
      } else {
        _services.set(filename, service)
        this.ctx.$service = this.ctx.$service || {};
        this.ctx.$service[filename] = instance;
        console.warn('Service ', service, 'use @Service(name)')
      }
    }
  }


  registerController( controller) {
    const instance = new controller(this.ctx)
    instance.ctx = this.ctx;

    let controllMiddlewares = decorators.getMiddleware(controller);
    controllMiddlewares = controllMiddlewares || [];
    controllMiddlewares.reverse();
    
    const preMiddlewares = [];
    for (let index = 0; index < controllMiddlewares.length; index++) {
      let middleware = controllMiddlewares[index];
      if(Object.prototype.toString.call(middleware)==="[object String]") {
        if(_middlewares.has(middleware)) preMiddlewares.push(_middlewares.get(middleware));
      } else {
        // 直接注入中间件函数
        preMiddlewares.push(middleware)
      }
    }
    decorators.iterator(controller, (prefix, subroute) => {
      let path;
      if (prefix.path && prefix.path.length > 1) {
        subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
        subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
        path = `${prefix.path}${subroute.path}`
      } else {
        path = `${subroute.path}`
      }

      console.log(path)

      let middlewares =decorators.getMiddleware(instance,subroute.prototype)
      middlewares = middlewares ||[];
      middlewares.reverse();

      if(middlewares.length>0||preMiddlewares.length>0) {
        let controllerMiddlewares = [].concat(preMiddlewares);
        for (let index = 0; index < middlewares.length; index++) {
          let middleware = middlewares[index];
          if(Object.prototype.toString.call(middleware)==="[object String]") {
            if(_middlewares.has(middleware)) controllerMiddlewares.push(_middlewares.get(middleware));
          } else {
            // 直接注入中间件函数
            controllerMiddlewares.push(middleware)
          }
        }

        controllerMiddlewares.push(
          instance[subroute.prototype].bind(instance)
        )

        const fn = compose(controllerMiddlewares);
        this.registerRoute(path, { method: subroute.method.toLowerCase()}, fn)
      } else {
        this.registerRoute(path, { method: subroute.method.toLowerCase() }, instance[subroute.prototype].bind(instance))
      }
    })
  }

  registerStore(name, store) {
    if (_webstore.get(name) === undefined) {
      _webstore.set(name, store)
      let vuxStore = new Vuex.Store(store, name);
      this.$store = vuxStore;
      this.ctx.$store = vuxStore;
    } else {
      throw new Error(`Store [${name}] has been declared`)
    }

  }

  registerMiddleware(filename, middleware) {
    if (_middlewares.get(filename)===undefined) {
      _middlewares.set(filename, middleware);
    } else {
      throw new Error(`Fliter [${filename}] has been declared`)
    }
  }

  watch(requireContext) {
    return requireContext.keys().map(key => {
      console.log(key)
      let m = requireContext(key);
      let c = m.default || m;
      let filename = key.replace(/(.*\/)*([^.]+).*/ig, "$2");
      if (key.match(/\/component\/.*\.vue$/) != null) {
        this.registerComponent(filename,c);
      } else if (key.match(/\/filter\/.*\.js$/) != null) {
        this.registerFilter(filename, c)
      } else if (key.match(/\/middleware\/.*\.js$/) != null) {
        this.registerMiddleware(filename, c)
      } else if (key.match(/\/controller\/.*\.js$/) != null) {
        // this.registerController(filename,c);
        _controllers.push( c)
      } else if (key.match(/\/service\/.*\.js$/) != null && this.$config && this.$config.mock !== true) {
        this.registerService(filename, c);
      } else if (key.match(/\/mock\/.*\.js$/) != null && this.$config && this.$config.mock === true) {
        this.registerService(filename, c);
      } else if (key.match(/\/store\/.*\.js$/) != null) {
        this.registerStore(filename, c);
      } else if (key.match(/\/plugin\.config\.js$/) != null) {
        c.forEach(item => {
          if (item.enable === true) _modules.push(item);
        })
      } else if (key.match(/\/development\.config\.js$/) != null) {
        if (this.$config.env === 'development') {
          this.$config = Object.assign(this.$config, c)
        }
      } else if (key.match(/\/production\.config\.js$/) != null) {
        if (this.$config.env === 'production') {
          this.$config = Object.assign(this.$config, c)
        }
      } else if (key.match(/\/app\.config\.js$/) != null) {
        this.$config = Object.assign(this.$config, c)
      }
    })
  }

  registerComponent(filename, component) {
    if (!(component instanceof Object)) {
      throw new TypeError('component must be Vue instance')
    }

    Vue.component(component.name||filename, component);
  }

  registerMainClient(mainClient) {
    mainClient(this);
    this.emit("did-mainclient")
  }
}