import { Expose } from 'class-transformer';

export class GetTicker24hrResponseDto {
  @Expose()
  symbol: string;

  @Expose()
  priceChangePercent: number;

  @Expose()
  prevClosePrice: number;

  @Expose()
  lastPrice: number;

  @Expose()
  bidPrice: number;

  @Expose()
  bidQty: number;

  @Expose()
  askPrice: number;

  @Expose()
  askQty: number;

  @Expose()
  openPrice: number;

  @Expose()
  highPrice: number;

  @Expose()
  lowPrice: number;

  @Expose()
  volume: number;

  @Expose()
  timestamp: number;
}
