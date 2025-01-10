import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryDepthDto {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  limit: string;
}
