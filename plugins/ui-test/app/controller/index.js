import 'reflect-metadata';
import D from "bitorjs-decorators";
import index from '../view/index';


@D.Controller('/plugin')
export default class {

  @D.Get('/')
  icon() {
    this.ctx.render(index)
  }
}