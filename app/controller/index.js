import {
  Controller,
  Get,
  Post,
  Middleware
} from 'bitorjs-decorators';
import index from '../view/index';

@Controller('/')
@Middleware('forbidden')
@Middleware((ctx,next)=>{
  console.warn("ddddd...")
  next()
})
export default class {
  @Get('/')
  @Middleware('forbidden')
  @Middleware((ctx,next)=>{
    console.warn("yyyy")
    next()
  })
  icon(a, b, c) {
    console.warn(a, b, c)
    this.ctx.render(index, {
      data: this.ctx.$store.state.ttt.data
    })
  }

  @Post('/api/data/:id/:user')
  @Middleware((ctx,next)=>{
    console.warn("bbbbb...")
    ctx.params = Object.assign(ctx.params, {
      test:1
    })
    next()
  })
  async b(a, b) {
    console.warn('eeee...')
    console.info('$$$$--',await this.ctx.$service.ff.aa())
    return this.ctx.$store.state.ttt.data;
  }
}