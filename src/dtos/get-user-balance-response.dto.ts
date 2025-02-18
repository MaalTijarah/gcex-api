import { Expose } from 'class-transformer';

export class GetUserBalanceResponseDto {
  @Expose()
  symbol: string;

  @Expose()
  available: number;

  @Expose()
  freeze: number;

  @Expose()
  pledge: string;
}
