import { CoingeckoService } from './coingecko.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [CoingeckoService],
  exports: [CoingeckoService],
})
export class CoingeckoModule {}
