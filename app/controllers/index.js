import D from 'bitorjs-decorators';
import loading from '../view/loading';
import button from '../view/button';
import toast from '../view/toast';

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/')
  index() {
    // this.ctx.render(Index)
    console.log(this.ctx)
    // this.ctx.redirect('/loading')
  }

  @D.Get('/loading')
  loading() {
    this.ctx.render(loading)
  }

  @D.Get('/button')
  button() {
    this.ctx.render(button)
  }

  @D.Get('/toast')
  toast() {
    this.ctx.render(toast)
  }

}

export default IndexController;