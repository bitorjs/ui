import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
import index from '../view/index';

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