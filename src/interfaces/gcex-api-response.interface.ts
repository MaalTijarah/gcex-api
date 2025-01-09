export interface TGcexApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
