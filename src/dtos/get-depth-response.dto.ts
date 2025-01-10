import { Expose } from 'class-transformer';

export class GetDepthResponseDto {
  @Expose()
  asks: string[][];

  @Expose()
  bids: string[][];
}
