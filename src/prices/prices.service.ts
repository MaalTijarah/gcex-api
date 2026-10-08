import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CoingeckoService } from "src/coingecko";

@Injectable()
export class PricesService {
    private readonly priceStore = new Map<string, any>();

    constructor(private readonly coingecko: CoingeckoService) {}

    getPrice(id: string, quote: string) {
      return this.priceStore.get(`${id}:${quote}`) ?? null;
    }

    private async fetchAndCache() {
    console.log('Fetching and storing prices');

    const ids = ["bitcoin", 'ethereum', 'litecoin', 'stellar', 'ripple', 'usd-coin', 'binancecoin'];
    const vsCurrencies = ['usd'];

    if (ids.length === 0 || vsCurrencies.length === 0) {
      console.log(
        'No valid token ID or currency ID found, skipping cache update',
      );
      return;
    }

    try {
      const prices = await this.coingecko.fetchSimplePrices(ids, vsCurrencies);

      let successCount = 0;
      let failedCount = 0;

      for (const p of prices.filter((p) => p.value !== null)) {
        try {
          this.priceStore.set(`${p.id}:${p.quote}`, p);
          console.log(`Cached price for asset: ${p.id}/${p.quote}`);
          successCount++;
        } catch (error) {
          console.error(`Failed to cache price for asset: ${p.id}: ${error.message}`);
          failedCount++;
        }
      }

      console.log(`Cache update complete: ${successCount} successful, ${failedCount} failed.`);
    } catch (error) {
      console.error(`Error during price fetch: ${(error as Error).message}`);
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  private async handleCron() {
    console.log('Cron job running');
    await this.fetchAndCache();
  }
}