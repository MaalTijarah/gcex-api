import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
// import { TGetDepthParams } from './types';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  public async getDepth(params: { symbol: string; limit: string }) {
    const { symbol, limit } = params;

    const depthResponse = await this.appRepository.fetchDepth({
      symbol,
      limit,
    });

    return depthResponse.data;
  }

  public async getTicker24hr() {
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

  public async getTickerPrice() {
    const tickersResponse = await this.appRepository.fetchTickers();

    const tickersData = tickersResponse.data;

    return Object.keys(tickersData).map((key) => {
      const value = tickersData[key];

      return {
        symbol: value.market,
        price: value.close,
      };
    });
  }

  public async getTrades(params: { symbol: string; limit: string }) {
    const { symbol, limit } = params;
    const dealsResponse = await this.appRepository.fetchDeals({
      symbol,
      limit,
    });

    return dealsResponse.data;
  }
}
