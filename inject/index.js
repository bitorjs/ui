import 'reflect-metadata';
import Vue from 'vue'
import decorators from 'bitorjs-decorators';
import Application from 'bitorjs-application'
import directives from './directive';

const path = require('path')

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
  }

  mountVue() {
    Vue.prototype.$bitor = this;
    this.ctx.render = (webview, props) => {
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
        if (Object.prototype.toString.call(this.$root.webview) === '[object String]') {
          return h('span', this.$root.webview);
        }
        return h(this.$root.webview, {
          props: this.$root.props
        });
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
    this.startServer()
    this.emit('after-server');
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

      this.registerRoute(path, {
        method: subroute.method.toLowerCase()
      }, instance[subroute.prototype].bind(instance))
    })
  }

  registerRequireContext(requireContext) {
    return requireContext.keys().map(key => {
      let c = requireContext(key).default;
      if (key.match(/components\/.*\.vue$/) != null) {
        this.registerComponent(c);
      } else if (key.match(/controllers\/.*\.js$/) != null) {
        this.registerController(c);
      }
    })
  }

  registerComponent(component) {
    if (!(component instanceof Object)) {
      throw new TypeError('component must be Vue instance')
    }

    Vue.component(component.name, component);
  }

  registerPlugin(plugin) {
    plugin(this)
  }
}