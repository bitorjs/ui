import D from 'bitorjs-decorators';
import loading from '../view/loading';
import button from '../view/button';

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/')
  index() {
    // this.ctx.render(Index)
  }

  @D.Get('/loading')
  loading() {
    this.ctx.render(loading)
  }

  @D.Get('/button')
  button() {
    this.ctx.render(button)
  }

}

export default IndexController;