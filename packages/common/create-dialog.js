import Vue from 'vue';

import {
  isServer
} from '../common/utils';

const createVirtalDialog = (vueComponent, defaultOptions) => {
  let instance = null;
  const initInstance = () => {
    instance = new(Vue.extend(vueComponent))({
      el: document.createElement('div')
    });

    instance.$on('input', value => {
      instance.value = value;
    });
    vueComponent.instance = instance;
    document.body.appendChild(instance.$el);
  };

  const virtalDialog = options => {
    /* istanbul ignore if */
    if (isServer) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      if (!instance) {
        initInstance();
      }

      Object.assign(instance, {
        resolve,
        reject,
        ...options
      });
    });
  };

  virtalDialog.alert = options => virtalDialog({
    ...virtalDialog.currentOptions,
    ...options
  });

  virtalDialog.close = () => {
    if (instance) {
      instance.value = false;
    }
  };

  virtalDialog.setDefaultOptions = options => {
    Object.assign(virtalDialog.currentOptions, options);
  };

  virtalDialog.resetDefaultOptions = () => {
    virtalDialog.currentOptions = Object.assign({}, defaultOptions);
  };

  virtalDialog.install = () => {
    Vue.use(vueComponent);
  };

  virtalDialog.resetDefaultOptions();
  return virtalDialog;
}


export default createVirtalDialog;