import D from 'bitorjs-decorators';
import icon from '../view/icon';
import loading from '../view/loading';
import button from '../view/button';
import toast from '../view/toast';

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }



  @D.Get('/loading')
  loading() {
    this.ctx.render(loading)
  }

  @D.Get('/icon')
  icon() {
    this.ctx.render(icon)
  }

  @D.Get('/button')
  button() {
    this.ctx.render(button)
  }

  @D.Get('/toast')
  toast() {
    this.ctx.render(toast)
  }

  @D.Get('/:page?')
  a() {
    this.ctx.render(button)
    // this.ctx.render(import(this.ctx.params.page))
    // console.log(this.ctx)
    // this.ctx.redirect('/loading')
  }
}

export default IndexController;