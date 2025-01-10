import { Expose } from 'class-transformer';

export class GetExchangeInfoResponseDto {
  @Expose()
  symbol: string;

  @Expose()
  status: string;

  @Expose()
  baseAsset: string;

  @Expose()
  baseAssetPrecision: number;

  @Expose()
  quoteAsset: string;

  @Expose()
  quotePrecision: number;

  @Expose()
  quoteAssetPrecision: number;

  @Expose()
  baseCommissionPrecision: number;

  @Expose()
  quoteCommissionPrecision: number;

  @Expose()
  orderTypes: string[];

  @Expose()
  quoteOrderQtyMarketAllowed: boolean;

  @Expose()
  isSpotTradingAllowed: boolean;

  @Expose()
  isMarginTradingAllowed: boolean;

  @Expose()
  quoteAmountPrecision: string;

  @Expose()
  baseSizePrecision: string;

  @Expose()
  permissions: string[];

  @Expose()
  filters: any[];

  @Expose()
  maxQuoteAmount: string;

  @Expose()
  makerCommission: string;

  @Expose()
  takerCommission: string;

  @Expose()
  tradeSideType: string;
}
