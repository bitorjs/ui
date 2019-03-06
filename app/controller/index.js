import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
import index from '../view/index';

@Controller('/')
export default class {
  @Get('/')
  icon() {
    this.ctx.render(index, {
      data: this.ctx.$store.state.ttt.data
    })
  }

  @Get('/api/data')
  async b() {
    console.info('$$$$--',await this.ctx.Service.ff.aa())
    return this.ctx.$store.state.ttt.data;
  }
}