import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Path } from './enums';
import { FilterDepthDto, FilterTradesDto } from './dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(Path.DEPTH)
  public async getDepth(@Query() filterDepthDto: FilterDepthDto) {
    return this.appService.getDepth(filterDepthDto);
  }

  @Get(`${Path.TICKER}/${Path.TWENTY_FOUR_HOUR}`)
  public async getTicker24hr() {
    return this.appService.getTicker24hr();
  }

  @Get(`${Path.TICKER}/${Path.PRICE}`)
  public async getTickerPrice() {
    return this.appService.getTickerPrice();
  }

  @Get(Path.TRADES)
  public async getTrades(@Query() filterTradesDto: FilterTradesDto) {
    return this.appService.getTrades(filterTradesDto);
  }
}
