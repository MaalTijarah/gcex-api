import { Expose } from 'class-transformer';

export class GetAveragePriceResponseDto {
  @Expose()
  price: string;
}
