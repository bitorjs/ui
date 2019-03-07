import {
  Controller,
  Get,
  Middleware
} from 'bitorjs-decorators';
import index from '../view/index';

@Controller('/')
export default class {
  @Get('/')
  @Middleware('forbidden')
  @Middleware((ctx,next)=>{
    console.error("yyyy")
    next()
  })
  icon() {
    this.ctx.render(index, {
      data: this.ctx.$store.state.ttt.data
    })
  }

  @Get('/api/data')
  async b() {
    console.info('$$$$--',await this.ctx.$service.ff.aa())
    return this.ctx.$store.state.ttt.data;
  }
}