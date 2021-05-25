import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemType } from './interfaces/PoeBulkItemData';
import { TradeSearchData, TradeSearchDataResponse } from './interfaces/PoeTradeSearchData';
import { LeagueData } from './interfaces/PoeLeagueData';
import { LeagueSelectionService } from '../leagueSelection/leagueSelectionService';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static instance: ApiService;
  public selectedLeague: LeagueData;

  constructor(private readonly httpClient: HttpClient) {
    ApiService.instance = this;
  }

  public async getPoeBulkItemData(): Promise<ItemType[]> {
    const response: any = await this.httpClient.get('https://www.pathofexile.com/api/trade/data/static').toPromise();
    const result: ItemType[] = response.result;
    const filteredResult = result.filter(x => x.label !== null); // Needed for e.x. Misc in response last entry

    return filteredResult.map((x => {
      x.entries.forEach(y => y.image = "https://web.poecdn.com" + y.image);
      return x;
    }));
  }

  public async getPoeTradeSearchRequestResult(buyItemType: string, sellItemType: string, minimumStock: number, league: string): Promise<TradeSearchDataResponse> {

    const tradeSearchRequestData: TradeSearchData = {
      exchange:
      {
        status:
        {
          option: "online"
        },
        have: [sellItemType],
        want: [buyItemType],
        minimum: minimumStock
      }
    };

    const tradeSearchRequestResponse: TradeSearchDataResponse = await this.httpClient.post<TradeSearchDataResponse>(`https://www.pathofexile.com/api/trade/exchange/${ league }`, tradeSearchRequestData).toPromise();

    return tradeSearchRequestResponse;
  }

  public async getFinalTradeSearchResult(query: string): Promise<any> {
    const finalTradeSearchResponse: any = await this.httpClient.get<any>(`https://www.pathofexile.com/api/trade/fetch/${ query }`).toPromise();
    return finalTradeSearchResponse;
  }

  public async getCurrentLeagues(): Promise<LeagueData[]> {
    const res: LeagueData[] = await this.httpClient.get<LeagueData[]>(`https://api.pathofexile.com/leagues`).toPromise();
    const filteredLeagueData = res.filter(x => {
      return !x?.id?.includes('SSF');
    });
    return filteredLeagueData;
  }
}
