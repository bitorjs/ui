import D from "bitorjs-decorators";
import index from '../view/index';


@D.namespace('/plugin')
class Controller {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @D.Get('/')
  icon() {
    this.ctx.render(index)
  }
}

export default Controller;