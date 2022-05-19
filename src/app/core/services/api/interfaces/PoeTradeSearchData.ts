
export interface TradeSearchDataResponse {
  id: string;
  complexity?: number;
  result: string[];
  total: number;
}

export interface TradeSearchData {
  engine: string;
  query: {
    have: string[];
    want: string[];
    status: {
      option: string;
    },
    minimum?: number;
  };
  sort: {
    have: string;
  }
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
