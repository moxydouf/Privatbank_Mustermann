export interface Stock {
  id: number;
  company_name: string;
  ticker_symbol: string;
  bid_price: number;
  ask_price: number;
  total_shares: number;
}

export interface StockData {
  time: string;
  bidPrice: number;
  askPrice: number;
  isMarketCrash?: boolean;
}

export interface GameState {
  selectedStock: Stock | null;
  balance: number;
  portfolio: Record<string, number>; // Map of ticker symbol to quantity
  gameStarted: boolean;
  gameEnded: boolean;
  isMarketCrash: boolean;
  consecutiveFalls: number;
}
