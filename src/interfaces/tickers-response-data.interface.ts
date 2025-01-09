export interface TTickerData {
  volume: number;
  high: number;
  deal: number;
  close: number;
  low: number;
  open: number;
  change: number;
  timestamp: number;
  market: string;
}

export interface TTickersResponseData {
  [market: string]: TTickerData;
}
