import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
import index from '../view/index';
import Toast from '../../packages/Toast';

@Controller('/')
class IndexController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @Get('/:page?')
  async a(...params) {
    let r = await this.ctx.Service.ff.aa();
    console.log(r)
    const data = this.ctx.app.store.state.ttt.data;
    const asyncView = import(`../view/src/${this.ctx.params.page}`)
    asyncView.then(res => {
      let items = data.filter(item => {
        return item.name == this.ctx.params.page;
      })

      // this.ctx.Store.root.setItem("title", items[0].label);
      this.ctx.render(res.default)
    }).catch(res => {
      Toast.fail('未找到页面')
      this.ctx.app.redirect('/')
    })
  }


}

export default IndexController;