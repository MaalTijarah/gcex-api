import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryTradesDto {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  limit: string;
}
