import {Controller, Get, Post} from 'bitorjs-decorators';
import index from '../view/index';

@Controller('/admin')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.data = [];//ctx.app.store.state.ttt.data;
  }


  @Get('/')
  icon() {
    this.ctx.render(index, {
      data: this.data
    })
  }

  @Get('/api/data')
  async b() {
    return this.data;
  }
}

export default IndexController;