import Vue from 'vue';
import virtualDialog from '../common/create-dialog';
import vueActionSheet from './action-sheet.vue';


const ActionSheet = virtualDialog(vueActionSheet,{
  value: true,
  title: '',
  actions: '',
  cancelText:'',
  overlay: true,
  lockScroll: true,
  closeOnClickOverlay: false
})

Vue.prototype.$actionSheet = ActionSheet;
window.ActionSheet = ActionSheet;

export default ActionSheet;