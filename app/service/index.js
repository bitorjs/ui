import D from 'bitorjs-decorators';

@D.Service('ff')
export default class {
  constructor(ctx) {

  }
  async aa() {
    return 'from service'
  }
}