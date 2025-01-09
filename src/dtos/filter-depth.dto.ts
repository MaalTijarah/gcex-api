import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterDepthDto {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  limit: string;
}
