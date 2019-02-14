import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
import index from '../view/index';
import config from '../lib/parse';

@Controller('/')
export default class IndexC{
  constructor(ctx) {
    this.ctx = ctx;
  }

  @Get('/')
  i() {



    this.ctx.render(index)
  }
}