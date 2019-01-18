import {
  Service
} from 'bitorjs-decorators';

@Service('ff')
export default class {
  constructor(ctx) {
    this.ctx = ctx;
  }
  async aa() {
    // console.log(this.ctx.axios)
    this.ctx.axios.get('/').then(res => {
      console.log(res)
    })
    return 'from service'
  }
}