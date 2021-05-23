
export interface TradeSearchDataResponse {
  id: string;
  result: string[];
  total: number;
}

export interface TradeSearchData {
  exchange: Exchange;
}

interface Exchange {
  status:
  {
    option: string;
  };
  have: string[];
  want: string[];
  minimum: number;
}
