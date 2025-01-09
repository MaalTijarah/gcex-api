import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterTradesDto {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  limit: string;
}
