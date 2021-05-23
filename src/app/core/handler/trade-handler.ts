import { ApiService } from "../services/api/apiService";
import { PoeItemResult } from "../services/api/interfaces/PoeItemResult";
import { TradeSearchDataResponse } from "../services/api/interfaces/PoeTradeSearchData";

export default class TradeHandler {
  public tradeId: string;
  public buyItemType: string;
  public sellItemType: string;
  public minimumStock: number;
  public availableTradeOffers: number;
  public resultIds: string[];
  private tradeSearchDataResponse: TradeSearchDataResponse;
  private currentResults: PoeItemResult[];

  constructor(
    buyItemType: string,
    sellItemType: string,
    minimumStock: number,
    tradeSearchDataResponse: TradeSearchDataResponse
  ) {
    this.resultIds = [];
    this.currentResults = [];
    this.buyItemType = buyItemType;
    this.sellItemType = sellItemType;
    this.minimumStock = minimumStock;
    this.tradeSearchDataResponse = tradeSearchDataResponse;
    this.initialize();
  }

  public async getNextTradeWhisper(): Promise<string> {
    if (this.currentResults.length <= 0) {
      const nextTradeResults = await this.getNextTradeResults();
      this.currentResults = nextTradeResults.result;
    }
    const currentResult = this.currentResults.shift();
    this.currentResults = this.currentResults.slice(1, this.currentResults.length);

    console.log('currentResult: ', currentResult);

    return this.generateWhisperMsg(currentResult);
  }

  private generateWhisperMsg(itemResult: PoeItemResult): string {
    let whisper = itemResult.listing.whisper;
    let sellAmount;
    let buyAmount = 0;

    // calculate here
    const sellerExchangeAmount = itemResult.listing.price.exchange.amount;
    const sellerBuyAmount = itemResult.listing.price.item.amount;

    let priceForOne = sellerExchangeAmount / sellerBuyAmount;

    if (this.buyItemType === 'chaos' && this.sellItemType === 'exalted') {
      priceForOne = sellerBuyAmount / sellerExchangeAmount;

      let canEffortMore = true;
      while (canEffortMore) {
        buyAmount += priceForOne;
        if (buyAmount + priceForOne > this.minimumStock) {
          canEffortMore = false;
        }
      }

      sellAmount = buyAmount / priceForOne;
      buyAmount = Math.round(buyAmount);
    } else {
      buyAmount = this.minimumStock;
      sellAmount = (this.minimumStock * priceForOne).toFixed(1);
    }

    // replace values for whisper msg
    whisper = whisper.replace('{0}', buyAmount.toString());
    whisper = whisper.replace('{1}', sellAmount.toString());

    return whisper;
  }


  public async getNextTradeResults(): Promise<any> {
    const query = this.getNextQueryString();
    return await ApiService.instance.getFinalTradeSearchResult(query);
  }

  private getNextQueryString(): string {

    let fetchQuery = '';
    let counter = 0;
    this.resultIds.forEach((x, i) => {
      if (i + 1 > 20) return;
      if (i !== 0) {
        fetchQuery += ',';
      }
      fetchQuery += `${ x }`;
      counter++;
    });
    fetchQuery += `?query=${ this.tradeId }&exchange`;

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
  }

}
