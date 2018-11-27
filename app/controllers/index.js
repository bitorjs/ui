import D from 'bitorjs-decorators';
import Index from '../view/index';

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/')
  index() {
    this.ctx.render(Index)
  }

}

export default IndexController;