import { ApiService } from "../services/api/apiService";
import { PoeItemResult } from "../services/api/interfaces/PoeItemResult";
import { TradeSearchDataResponse } from "../services/api/interfaces/PoeTradeSearchData";

export default class SingleTradeHandler {
  public tradeId: string;
  public availableTradeOffers: number;
  public resultIds: string[];
  private tradeSearchDataResponse: TradeSearchDataResponse;
  public currentResults: PoeItemResult[];
  public currentResult: PoeItemResult;

  constructor(
    tradeSearchDataResponse: TradeSearchDataResponse
  ) {
    this.resultIds = [];
    this.currentResults = [];
    this.tradeSearchDataResponse = tradeSearchDataResponse;
    this.initialize();
  }

  public async getNextTradeWhisper(): Promise<string> {
    if (this.currentResults.length <= 0) {
      console.log('this.currentResults.length: ', this.currentResults.length);
      const nextTradeResults = await this.getNextTradeResults();
      this.currentResults = nextTradeResults.result;
    }
    this.currentResult = this.currentResults.shift();

    return this.currentResult.listing.whisper;
  }

  public async prepareNextTrade(): Promise<void> {
    if (this.currentResults.length <= 0 && this.resultIds.length > 0) {
      const nextTradeResults = await this.getNextTradeResults();
      this.currentResults = nextTradeResults.result;
    }

    const currentResult = this.currentResults.shift();
    this.currentResult = currentResult;
    this.resultIds = this.resultIds.slice(1, this.resultIds.length);
  }


  public async getNextTradeResults(): Promise<any> {
    const query = this.createNextQueryString();
    return await ApiService.instance.getFinalTradeSearchResult(query);
  }

  private createNextQueryString(): string {

    let fetchQuery = '';
    let counter = 0;
    this.resultIds.forEach((x, i) => {
      if (i + 1 > 10) return;
      if (i !== 0) {
        fetchQuery += ',';
      }
      fetchQuery += `${ x }`;
      counter++;
    });
    fetchQuery += `?query=${ this.tradeId }`;

    // remove used ids from array
    if (this.resultIds.length > counter) {
      this.resultIds = this.resultIds.slice(counter, this.resultIds.length - 1);
    }

    return fetchQuery;
  }

  private initialize(): void {
    this.resultIds = this.tradeSearchDataResponse.result;
    this.tradeId = this.tradeSearchDataResponse.id;
    this.availableTradeOffers = this.tradeSearchDataResponse.total;

    console.log('this.resultIds: ', this.resultIds);
    console.log('this.tradeId: ', this.tradeId);
    console.log('this.availableTradeOffers: ', this.availableTradeOffers);
  }
}
