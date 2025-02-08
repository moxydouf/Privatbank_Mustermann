export interface SharePrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
}

export interface HistoricalPrice {
  date: string;
  price: number;
  volume: number;
}

export interface OrderBookEntry {
  id: string;
  type: "BUY" | "SELL";
  symbol: string;
  price: number;
  quantity: number;
  time: string;
}

// ADDED: New types for share overview and details
export interface ShareOverview {
  shares: SharePrice[];
}

export interface ShareDetails {
  symbol: string;
  historicalPrices: HistoricalPrice[];
}

export interface OrderBook {
  orders: OrderBookEntry[];
}
