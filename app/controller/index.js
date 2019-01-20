import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
import index from '../view/index';

@Controller('/')
export default class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
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