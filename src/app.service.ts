import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { TGetDepthParams } from './types';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  public async getDepth(params: TGetDepthParams) {
    const { symbol, limit } = params;

    const depthResponse = await this.appRepository.fetchDepth({
      symbol,
      limit,
    });

    return depthResponse.data;
  }

  public async getTicker() {
    const tickersResponse = await this.appRepository.fetchTickers();

    const tickersData = tickersResponse.data;

    return Promise.all(
      Object.keys(tickersData).map(async (key) => {
        const value = tickersData[key];

        const depthResponse = await this.appRepository.fetchDepth({
          symbol: key,
          limit: '50',
        });

        const asks = depthResponse.data.asks;
        const bids = depthResponse.data.bids;

        const bidPrice = bids[0][0];
        const bidQty = bids[0][1];

        const askPrice = asks[0][0];
        const askQty = asks[0][1];

        return {
          symbol: value.market,
          priceChangePercent: value.change,
          prevClosePrice: value.close,
          lastPrice: value.close,
          bidPrice,
          bidQty,
          askPrice,
          askQty,
          openPrice: value.open,
          highPrice: value.high,
          lowPrice: value.low,
          volume: value.volume,
          timestamp: value.timestamp,
        };
      }),
    );
  }
}
