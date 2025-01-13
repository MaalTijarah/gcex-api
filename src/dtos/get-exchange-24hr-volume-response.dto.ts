import { Expose } from 'class-transformer';

export class GetExchange24hrVolumeResponseDto {
  @Expose()
  volume: number;
}
