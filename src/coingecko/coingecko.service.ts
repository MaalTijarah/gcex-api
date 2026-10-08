import {  Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Coingecko } from '@coingecko/coingecko-typescript';
import { ConfigService } from '@nestjs/config';

export interface SimplePrice {
  id: string;
  quote: string;
  value: number | null;
  marketCap: number | null;
  volume: number | null;
  change: number | null;
  updatedAt: Date | null;
}

@Injectable()
export class CoingeckoService implements OnModuleInit {
  private client: Coingecko;
  private readonly logger = new Logger(CoingeckoService.name);

  constructor(
    // @Inject(MODULE_OPTIONS_TOKEN) public options: CoingeckoModuleOptions,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    console.log("Key: ", this.config.get<string>('COINGECKO_ENVIRONMENT'))
    this.client = new Coingecko({
      environment: this.config.get<"pro" | "demo">('COINGECKO_ENVIRONMENT'),
      proAPIKey:this.config.get<string>('COINGECKO_API_KEY'),
      // demoAPIKey: this.config.get<string>('COINGECKO_API_KEY'),
    });
  }

  async ping() {
    return this.client.ping.get();
  }

  async fetchSimplePrices(
    ids: string[],
    vsCurrencies: string[] = ['usd'],
  ): Promise<SimplePrice[]> {
    const marketPairs: { id: string; quote: string }[] = ids.flatMap((id) =>
      vsCurrencies.map((quote) => ({ id, quote })),
    );

    try {
      const prices = await this.client.simple.price.get({
        ids: ids.join(','),
        vs_currencies: vsCurrencies.join(','),
        precision: '6',
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true,
        include_last_updated_at: true,
      });

      return marketPairs.map(({ id, quote }) => {
        const item = prices[id];

        if (!item || !item[quote]) {
          this.logger.warn(
            `No data available for ID: ${id}. It may be invalid or not listed on CoinGecko.`,
          );

          return {
            id,
            quote,
            value: null,
            marketCap: null,
            volume: null,
            change: null,
            updatedAt: null,
          };
        }

        const updatedAt = item.last_updated_at
          ? new Date(item.last_updated_at * 1000)
          : null;

        return {
          id,
          quote,
          value: item[quote],
          marketCap: item[`${quote}_market_cap`],
          volume: item[`${quote}_24h_vol`],
          change: item[`${quote}_24h_change`],
          updatedAt,
        };
      });
    } catch (error) {
      this.logger.error(`Error fetching prices: ${error.message}`);
      return marketPairs.map(({ id, quote }) => ({
        id,
        quote,
        value: null,
        marketCap: null,
        volume: null,
        change: null,
        updatedAt: null,
      }));
    }
  }
}
