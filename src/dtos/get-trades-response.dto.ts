import { Expose } from 'class-transformer';

export class GetTradeResponseDto {
  @Expose()
  id: number;

  @Expose()
  price: string;

  @Expose()
  qty: string;

  @Expose()
  time: number;

  @Expose()
  type: number;
}
