export default Store => {

  return new Store('ttt', {
    state: {
      count: 0,
      data: [{
        name: 'loading',
        label: '加载'
      }, {
        name: 'uploader',
        label: '上传'
      }, {
        name: 'icon',
        label: '图标'
      }, {
        name: 'button',
        label: '按钮'
      }, {
        name: 'layout',
        label: '布局'
      }, {
        name: 'cell',
        label: 'Cell'
      }, {
        name: 'navbar',
        label: 'navbar'
      }, {
        name: 'dialog',
        label: '弹框'
      }, {
        name: 'toast',
        label: 'Toast'
      }, {
        name: 'sketeton',
        label: '骨架'
      }, {
        name: 'waterfall',
        label: '瀑布流'
      }]
    },
    mutations: {
      increate(state, payload) {
        state.count++;
      }
    },
    actions: {
      increment(context) {
        // context.commit('increment')
        // console.log(context)
      }
    }
  });

}