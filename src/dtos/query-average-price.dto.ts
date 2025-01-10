import { IsNotEmpty, IsString } from 'class-validator';

export class QueryAveragePriceDto {
  @IsNotEmpty()
  @IsString()
  symbol: string;
}
