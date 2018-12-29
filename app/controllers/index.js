import D from 'bitorjs-decorators';
import index from '../view/index';

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }


  @D.Get('/')
  icon() {
    this.ctx.render(index, {
      data: [{
        name: 'loading',
        label: '加载'
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
      }]
    })
  }

  @D.Get('/:page?')
  a() {
    // console.log('虎皮', md52('虎皮'))
    // console.log('虎皮', md5Hex('虎皮'))
    // console.log('虎皮', md5Hex2('虎皮'))
    const asyncView = import(`../view/src/${this.ctx.params.page}`)
    asyncView.then(res => {
      this.ctx.render(res.default)
    }).catch(res => {
      this.ctx.render(index)
    })
  }
}

export default IndexController;