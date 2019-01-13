import D from 'bitorjs-decorators';
import index from '../view/index';

@D.Controller('/')
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

  @D.Get('/api/data')
  async b() {
    return this.data;
  }

  @D.Get('/:page?')
  async a(a, b, c) {
    let r = await this.ctx.Service.ff.aa();
    console.log('Indexcontroller ', a, b, c, r)
    let items = this.data.filter(item => {
      return item.name == this.ctx.params.page;
    })

    this.ctx.app.store.root.setItem("title", items[0].label);
    // const asyncView = import(`../view/src/${this.ctx.params.page}`)
    const asyncView = Promise.resolve(require(`../view/src/${this.ctx.params.page}`))
    asyncView.then(res => {
      this.ctx.render(res.default)
    }).catch(res => {
      this.ctx.render(index, {
        data: this.data
      })
    })
  }


}

export default IndexController;