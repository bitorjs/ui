import D from 'bitorjs-decorators';
import index from '../view/index';

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.data = ctx.app.store.state.ttt.data;
  }


  @D.Get('/')
  icon() {
    this.ctx.render(index, {
      data: this.data
    })
  }

  @D.Get('/:page?')
  a(a, b, c) {
    console.log(a, b, c)
    let item = this.data.filter(item => {
      return item.name == this.ctx.params.page;
    })
    // this.ctx.app.store.setItem("title", item[0].label);
    const asyncView = import(`../view/src/${this.ctx.params.page}`)
    asyncView.then(res => {
      this.ctx.render(res.default)
    }).catch(res => {
      this.ctx.render(index)
    })
  }
}

export default IndexController;