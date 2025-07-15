import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpRepository, HttpService } from './http';
import {
  TDepthResponseData,
  TGcexApiResponse,
  TTickersResponseData,
  TDealResponseData,
  TAssetBalanceResponseData,
} from './interfaces';
import { ConfigService } from '@nestjs/config';
import { EnvVar, GcexApiPayload } from './enums';

@Injectable()
export class AppRepository extends HttpRepository implements OnModuleInit {
  private baseUrl: string;
  private adminUrl: string;

  constructor(
    protected readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    super(http);
  }

  onModuleInit(): void {
    this.baseUrl = this.config.get<string>(EnvVar.GCEX_BASE_URL);
    this.adminUrl = this.config.get<string>(EnvVar.GCEX_ADMIN_URL);
  }

  public async fetchDepth(params: { symbol: string; limit: string }) {
    const { symbol, limit = '100' } = params;
    const depthFormData = new FormData();

    depthFormData.append(GcexApiPayload.MARKET, symbol);
    depthFormData.append(GcexApiPayload.LIMIT, limit);
    depthFormData.append(GcexApiPayload.INTERVAL, '0.01');

    return this.post<TGcexApiResponse<TDepthResponseData>, FormData>({
      url: `${this.baseUrl}/market/depth`,
      data: depthFormData,
      config: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    });
  }

  public async fetchTickers() {
    return this.post<TGcexApiResponse<TTickersResponseData>, object>({
      url: `${this.baseUrl}/market/tickers`,
      data: {},
      config: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    });
  }

  public async fetchDeals(params: { symbol: string; limit: string }) {
    const { symbol, limit = '50' } = params;
    const dealsFormData = new FormData();

    dealsFormData.append(GcexApiPayload.MARKET, symbol);
    dealsFormData.append(GcexApiPayload.LIMIT, limit);
    dealsFormData.append(GcexApiPayload.LAST_ID, '0');

    return this.post<TGcexApiResponse<TDealResponseData[]>, FormData>({
      url: `${this.baseUrl}/market/deals`,
      data: dealsFormData,
      config: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    });
  }

  public async fetchAccountBalance(email: string) {
    const balanceFormData = new FormData();

    balanceFormData.append(GcexApiPayload.TYPE, 'email');
    balanceFormData.append(GcexApiPayload.ITEM, email);
    balanceFormData.append(GcexApiPayload.CHANNEL, 'gcs');

    return this.post<TGcexApiResponse<TAssetBalanceResponseData[]>, FormData>({
      url: `${this.adminUrl}/balance/query`,
      data: balanceFormData,
      config: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    });
  }
}
