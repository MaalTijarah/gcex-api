import { HttpService } from './http.service';
import { AxiosRequestConfig } from 'axios';

export abstract class HttpRepository {
  constructor(protected readonly http: HttpService) {}

  protected async fetch<T>(params: {
    url: string;
    config?: AxiosRequestConfig;
  }): Promise<T> {
    try {
      const { url, config } = params;

      const response = await this.http.axiosRef.get<T>(
        url,

        config,
      );

      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  protected async post<T, D>(params: {
    url: string;
    data: D;
    config?: AxiosRequestConfig;
  }): Promise<T> {
    try {
      const { url, data, config } = params;

      const response = await this.http.axiosRef.post<T>(url, data, config);

      return response?.data;
    } catch (error) {
      throw error;
    }
  }
}
