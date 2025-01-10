import { Expose } from 'class-transformer';

export class GetTickerPriceDto {
  @Expose()
  symbol: string;

  @Expose()
  price: number;
}
