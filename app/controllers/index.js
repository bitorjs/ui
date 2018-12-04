import D from 'bitorjs-decorators';
import icon from '../view/icon';
import loading from '../view/loading';
import button from '../view/button';
import toast from '../view/toast';
import layout from '../view/layout';
import cell from '../view/cell';
import navbar from '../view/navbar';
import dialog from '../view/dialog';

@D.namespace('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }



  // @D.Get('/loading')
  // async loading() {
  //   const s = await import('../view/loading')
  //   console.log(s.default)
  //   console.log(loading)
  //   this.ctx.render(s.default)
  // }

  // @D.Get('/icon')
  // icon() {
  //   this.ctx.render(icon)
  // }

  // @D.Get('/button')
  // button() {
  //   this.ctx.render(button)
  // }

  // @D.Get('/toast')
  // toast() {
  //   this.ctx.render(toast)
  // }

  // @D.Get('/layout')
  // layout() {
  //   this.ctx.render(layout)
  // }

  // @D.Get('/cell')
  // cell() {
  //   this.ctx.render(cell)
  // }

  // @D.Get('/navbar')
  // navbar() {
  //   this.ctx.render(navbar)
  // }

  // @D.Get('/dialog')
  // dialog() {
  //   this.ctx.render(dialog)
  // }

  @D.Get('/:page?')
  a() {
    const asyncView = import(`../view/${this.ctx.params.page}`)
    asyncView.then(res => {
      this.ctx.render(res.default)
    }).catch(res => {
      this.ctx.render(button)
    })
  }
}

export default IndexController;