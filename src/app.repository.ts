import { Injectable } from '@nestjs/common';
import { HttpRepository, HttpService } from './core';
import { TDepthResponseData, TGcexApiResponse } from './interfaces';
import { TGetDepthParams } from './types';
import { ConfigService } from '@nestjs/config';
import { EnvVar } from './enums';
import { TTickersResponseData } from './interfaces/tickers-response-data.interface';

type TFetchDepthParams = TGetDepthParams;

enum GcexApiPayload {
  MARKET = 'market',
  LIMIT = 'limit',
  INTERVAL = 'interval',
}

@Injectable()
export class AppRepository extends HttpRepository {
  private baseUrl: string;

  constructor(
    protected readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    super(http);

    this.initialize();
  }

  private initialize() {
    this.baseUrl = this.config.get<string>(EnvVar.GCEX_BASE_URL);
  }

  public async fetchDepth(params: TFetchDepthParams) {
    const { symbol, limit = 100 } = params;
    const depthFormData = new FormData();

    depthFormData.append(GcexApiPayload.MARKET, symbol);
    depthFormData.append(GcexApiPayload.LIMIT, `${limit}`);
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
}
