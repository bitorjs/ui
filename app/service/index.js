import {Service} from 'bitorjs-decorators';

@Service('ff')
export default class {
  constructor(ctx) {
  }
  async aa() {
    return 'from service'
  }
}