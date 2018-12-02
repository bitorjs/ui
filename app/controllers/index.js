import D from 'bitorjs-decorators';
import icon from '../view/icon';
import loading from '../view/loading';
import button from '../view/button';
import toast from '../view/toast';
import layout from '../view/layout';
import cell from '../view/cell';
import navbar from '../view/navbar';

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

  @D.Get('/layout')
  layout() {
    this.ctx.render(layout)
  }

  @D.Get('/cell')
  cell() {
    this.ctx.render(cell)
  }

  @D.Get('/navbar')
  cell() {
    this.ctx.render(navbar)
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