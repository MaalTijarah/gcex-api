import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Path } from './enums';
import {
  QueryDepthDto,
  QueryTradesDto,
  QueryAveragePriceDto,
  GetDepthResponseDto,
  GetTickerPriceDto,
  GetTradeResponseDto,
  GetAveragePriceResponseDto,
  GetExchangeInfoResponseDto,
} from './dtos';
import { Serialize } from './decorators/serialize.decorator';
import { GetTicker24hrResponseDto } from './dtos/get-ticker-24hr-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Serialize(GetDepthResponseDto)
  @Get(Path.DEPTH)
  @HttpCode(HttpStatus.OK)
  public async getDepth(@Query() QueryDepthDto: QueryDepthDto) {
    return this.appService.getDepth(QueryDepthDto);
  }

  @Serialize(GetTicker24hrResponseDto)
  @Get(`${Path.TICKER}/${Path.TWENTY_FOUR_HOUR}`)
  @HttpCode(HttpStatus.OK)
  public async getTicker24hr() {
    return this.appService.getTicker24hr();
  }

  @Serialize(GetTickerPriceDto)
  @Get(`${Path.TICKER}/${Path.PRICE}`)
  @HttpCode(HttpStatus.OK)
  public async getTickerPrice() {
    return this.appService.getTickerPrice();
  }

  @Serialize(GetTradeResponseDto)
  @Get(Path.TRADES)
  @HttpCode(HttpStatus.OK)
  public async getTrades(@Query() queryTradesDto: QueryTradesDto) {
    return this.appService.getTrades(queryTradesDto);
  }

  @Serialize(GetAveragePriceResponseDto)
  @Get(Path.AVERAGE_PRICE)
  @HttpCode(HttpStatus.OK)
  public async getAveragePrice(
    @Query() queryAveragePriceDto: QueryAveragePriceDto,
  ) {
    return this.appService.getAveragePrice(queryAveragePriceDto);
  }

  @Serialize(GetExchangeInfoResponseDto)
  @Get(Path.EXCHANGE_INFO)
  @HttpCode(HttpStatus.OK)
  public async getExchangeInfo() {
    return this.appService.getExchangeInfo();
  }
}
