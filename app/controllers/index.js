import D from 'bitorjs-decorators';
import index from '../view/index';

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.data = [{
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
  }


  @D.Get('/')
  icon() {
    this.ctx.render(index, {
      data: this.data
    })
  }

  @D.Get('/:page?')
  a() {
    let item = this.data.filter(item => {
      return item.name == this.ctx.params.page;
    })
    this.ctx.app.store.setItem("title", item[0].label);
    const asyncView = import(`../view/src/${this.ctx.params.page}`)
    asyncView.then(res => {
      this.ctx.render(res.default)
    }).catch(res => {
      this.ctx.render(index)
    })
  }
}

export default IndexController;