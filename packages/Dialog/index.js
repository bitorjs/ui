import Vue from 'vue';
import virtualDialog from '../common/create-dialog';
import VanDialog from './dialog.vue';


const Dialog = virtualDialog(VanDialog,{
  value: true,
  title: '',
  message: '',
  overlay: true,
  className: '',
  lockScroll: true,
  beforeClose: null,
  confirmButtonText: '',
  cancelButtonText: '',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  padding: true,
  callback: action => {
    console.log(VanDialog.instance)
    VanDialog.instance[action === 'confirm' ? 'resolve' : 'reject'](action);
  }
})


Dialog.confirm = options => Dialog({
  ...Dialog.currentOptions,
  showCancelButton: true,
  ...options
});

Vue.prototype.$dialog = Dialog;
window.Dialog = Dialog;

export default Dialog;