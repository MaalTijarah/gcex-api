import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Path } from './enums';
import { FilterDepthDto } from './dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(Path.DEPTH)
  public async getDepth(@Query() filterDepthDto: FilterDepthDto) {
    return this.appService.getDepth(filterDepthDto);
  }

  @Get(Path.TICKER_24H)
  public async getTicker() {
    return this.appService.getTicker();
  }
}
