import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
import index from '../view/index';

@Controller('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
    // this.app = ctx.app;
    // this.data = ;
  }


  @Get('/')
  icon() {
    this.ctx.render(index, {
      data: this.ctx.app.store.state.ttt.data
    })
  }

  @Get('/api/data')
  async b() {
    return this.ctx.app.store.state.ttt.data;
  }
}

export default IndexController;