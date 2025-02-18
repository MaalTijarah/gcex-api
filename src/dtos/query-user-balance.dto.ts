import { IsNotEmpty, IsString } from 'class-validator';

export class QueryUserBalanceDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  item: string;
}
