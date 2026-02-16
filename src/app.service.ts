import { Injectable, OnModuleInit } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { EmailsService } from './emails';
import { Asset } from './types';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { EnvVar } from './enums';
import { Cron, CronExpression } from '@nestjs/schedule';

// import { TGetDepthParams } from './types';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly appRepository: AppRepository,
    private readonly emails: EmailsService,
    private readonly logger: Logger,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    // await this.alert()
  }

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

    const deals = dealsResponse.data;

    return deals.map((deal) => {
      return {
        id: deal.id,
        price: deal.price,
        qty: deal.amount,
        time: deal.time,
        type: deal.type,
      };
    });
  }

  public async getAveragePrice(params: { symbol: string }) {
    const { symbol } = params;

    const tickersResponse = await this.appRepository.fetchTickers();
    const tickersData = tickersResponse.data;

    const market = tickersData[symbol];

    const averagePrice = (market.high + market.low) / 2;

    return {
      price: averagePrice,
    };
  }

  public async getExchangeInfo() {
    return {
      symbol: 'GCS/USDT',
      status: 'ENABLED',
      baseAsset: 'GCS',
      baseAssetPrecision: 6,
      quoteAsset: 'USDT',
      quotePrecision: 3,
      quoteAssetPrecision: 3,
      baseCommissionPrecision: 2,
      quoteCommissionPrecision: 3,
      orderTypes: ['LIMIT', 'LIMIT_MAKER'],
      quoteOrderQtyMarketAllowed: false,
      isSpotTradingAllowed: false,
      isMarginTradingAllowed: false,
      quoteAmountPrecision: '5',
      baseSizePrecision: '0.0001',
      permissions: ['SPOT', 'LIMIT'],
      filters: [],
      maxQuoteAmount: '5000000',
      makerCommission: '0.002',
      takerCommission: '0.002',
      tradeSideType: '1',
    };
  }

  public async getExchange24hrVolume() {
    const tickersResponse = await this.appRepository.fetchTickers();

    const tickersData = tickersResponse.data;

    let totalVolume = 0;

    Object.keys(tickersData).map((key) => {
      const value = tickersData[key];

      const volume24hr = value.close * value.volume;

      totalVolume += volume24hr;
    });

    return {
      volume: +totalVolume.toFixed(3),
    };
  }

  public async getPoRAccountBalance() {
    const balanceResponse = await this.appRepository.fetchAccountBalance(
      'chief@goldchainex.com',
    );

    return balanceResponse.data;
  }

  @Cron(CronExpression.EVERY_HOUR)
  public async alert() {
    const recipientsStr = this.config.get<string>(EnvVar.ALERT_RECIPIENTS);
    const recipients = recipientsStr.split(',');
    await this.checkBalanceAndAlert(
      'finance@goldchainex.com',
      ['GCS', 'USDT'],
      recipients,
    );

    await this.checkBalanceAndAlert(
      'gcvault@goldchainex.com',
      ['BTC', 'ETH', 'LTC', 'XRP', 'XLM', 'RUSD', 'USDT'],
      recipients,
    );

    await this.checkBalanceAndAlert(
      'Finance@maalchain.com',
      ['MAAL', 'USDT'],
      recipients,
    );
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  public async alertLevel1() {
    const recipientsStr = this.config.get<string>(EnvVar.ALERT_RECIPIENTS);
    const recipients = recipientsStr.split(',');
    await this.checkBalanceAndAlertLevel1(
      'finance@goldchainex.com',
      ['GCS', 'USDT'],
      recipients,
    );

    await this.checkBalanceAndAlertLevel1(
      'gcvault@goldchainex.com',
      ['BTC', 'ETH', 'LTC', 'XRP', 'XLM', 'USDT'],
      recipients,
    );

    await this.checkBalanceAndAlertLevel1(
      'Finance@maalchain.com',
      ['MAAL', 'USDT'],
      recipients,
    );
  }

  private async checkBalanceAndAlert(
    account: string,
    allowableAssets: string[],
    emails: string[],
  ) {
    // const level1Threshold = 60000;
    const level2Threshold = 45000;
    const level3Threshold = 25000;

    const tickersResponse = await this.appRepository.fetchTickers();

    const tickers = tickersResponse.data;

    const balanceResponse =
      await this.appRepository.fetchAccountBalance(account);

    const rawAssets = balanceResponse.data;
    const assets = rawAssets.filter((a) => allowableAssets.includes(a.symbol));

    // const level1Assets: Asset[] = [];
    const level2Assets: Asset[] = [];
    const level3Assets: Asset[] = [];

    const a = assets.map((a) => {
      const symbol = a.symbol;
      const available = a.available;
      const freeze = a.freeze;
      const market = symbol + '/USDT';

      let price = 1;
      let balanceUSDT = 0;
      let balance = 0;

      if (symbol !== 'USDT') {
        price = tickers[market].close;
        balanceUSDT = Math.floor(available * price + freeze * price);
        balance = available + freeze;
      } else {
        balanceUSDT = Math.floor(available * price);
        balance = available;
      }

      const asset = {
        symbol,
        balance,
        balanceUSDT,
      };

      // if (balanceUSDT <= level3Threshold) {
      //   level3Assets.push(asset);
      // } else if (balanceUSDT <= level2Threshold) {
      //   level2Assets.push(asset);
      // } else if (balanceUSDT <= level1Threshold) {
      //   level1Assets.push(asset);
      // }

      if (balanceUSDT <= level3Threshold) {
        level3Assets.push(asset);
      } else if (balanceUSDT <= level2Threshold) {
        level2Assets.push(asset);
      }

      return asset;
    });

    if (level2Assets.length !== 0) {
      await this.emails.alert(
        emails,
        2,
        account,
        level2Threshold,
        level2Assets,
      );
    }

    if (level3Assets.length !== 0) {
      await this.emails.alert(
        emails,
        3,
        account,
        level3Threshold,
        level3Assets,
      );
    }

    console.log(a);

    console.log(level2Assets);
    console.log(level3Assets);

    this.logger.log('SENT ALERT MESSAGE SUCCEED.');
  }

  private async checkBalanceAndAlertLevel1(
    account: string,
    allowableAssets: string[],
    emails: string[],
  ) {
    const level1Threshold = 60000;
    const level2Threshold = 45000;
    // const level3Threshold = 25000;

    const tickersResponse = await this.appRepository.fetchTickers();

    const tickers = tickersResponse.data;

    console.log(tickers);

    const balanceResponse =
      await this.appRepository.fetchAccountBalance(account);

    const rawAssets = balanceResponse.data;
    const assets = rawAssets.filter((a) => allowableAssets.includes(a.symbol));

    const level1Assets: Asset[] = [];
    // const level2Assets: Asset[] = [];
    // const level3Assets: Asset[] = [];

    assets.map((a) => {
      const symbol = a.symbol;
      const available = a.available;
      const freeze = a.freeze;
      const market = symbol + '/USDT';

      let price = 1;
      let balanceUSDT = 0;
      let balance = 0;

      if (symbol !== 'USDT') {
        console.log("Symbol: ", symbol)
        price = tickers[market].close;
        balanceUSDT = Math.floor(available * price + freeze * price);
        balance = available + freeze;
      } else {
        balanceUSDT = Math.floor(available * price);
        balance = available;
      }

      const asset = {
        symbol,
        balance,
        balanceUSDT,
      };

      // if (balanceUSDT <= level3Threshold) {
      //   level3Assets.push(asset);
      // } else if (balanceUSDT <= level2Threshold) {
      //   level2Assets.push(asset);
      // } else if (balanceUSDT <= level1Threshold) {
      //   level1Assets.push(asset);
      // }
      if (balanceUSDT <= level1Threshold && balanceUSDT > level2Threshold) {
        level1Assets.push(asset);
      }

      return asset;
    });

    if (level1Assets.length !== 0) {
      await this.emails.alert(
        emails,
        1,
        account,
        level1Threshold,
        level1Assets,
      );
    }

    // if (level2Assets.length !== 0) {
    //   await this.emails.alert(
    //     emails,
    //     2,
    //     account,
    //     level2Threshold,
    //     level2Assets,
    //   );
    // }

    // if (level3Assets.length !== 0) {
    //   await this.emails.alert(
    //     emails,
    //     3,
    //     account,
    //     level3Threshold,
    //     level3Assets,
    //   );
    // }

    this.logger.log('SENT ALERT MESSAGE SUCCEED.');
  }
}
