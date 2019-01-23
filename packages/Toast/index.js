import Vue from 'vue';
import virtualDialog from '../common/create-dialog';
import VueToast from './Toast';

const Toast = virtualDialog(VueToast, {
  type: 'text',
  mask: false,
  message: '',
  value: true,
  duration: 3000,
  position: 'middle',
  loadingType: 'circular',
  forbidClick: false,
  overlay: false,
  lockScroll: false,
  closeOnClickOverlay: true,
  overlayStyle: {}
});

let timer = null;
['loading', 'fail', 'success', 'text'].map(method => {
  Toast[method] = (options) => {
    let xx = method !== 'text' ? options : {
      message: options
    };
    Toast.alert({
      type: method,
      ...xx
    })

    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      Toast.close();
    }, options.duration || 3000)
  }
})


Vue.prototype.$toast = Toast;
window.Toast = Toast;

export default Toast;