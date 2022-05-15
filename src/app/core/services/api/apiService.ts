import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemType } from './interfaces/PoeBulkItemData';
import { TradeSearchData, TradeSearchDataResponse } from './interfaces/PoeTradeSearchData';
import { LeagueData } from './interfaces/PoeLeagueData';
import { StatType } from './interfaces/PoeStatsData';
import { Item, ItemEntrySearch } from './interfaces/Item';
import SingleItemQuery, { StatFilter, StatQuery } from './interfaces/single-item-query';
import Stat from '../../../pages/single/itemstat/stat';

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

  public async getPoeStats(): Promise<StatType[]> {
    const response: any = await this.httpClient.get('https://www.pathofexile.com/api/trade/data/stats').toPromise();
    const result: StatType[] = response.result;

    return result;
  }

  public async getPoeItems(): Promise<Item[]> {
    const response: any = await this.httpClient.get('https://www.pathofexile.com/api/trade/data/items').toPromise();
    const result: Item[] = response.result;

    return result;
  }

  public async getSingleTradeSearchRequestResult(league: string, searchEntry?: ItemEntrySearch, stats?: Stat[]): Promise<TradeSearchDataResponse> {
    const tradeSearchRequestData: SingleItemQuery = {
      sort: {
        price: 'asc'
      },
      query: {
        status: {
          option: 'online'
        }
      }
    };

    // Add search query if passed
    if (searchEntry) {
      let type: {
        discriminator?: string; // e.x. "warfortheatlas"
        option?: string; // e.x. "Burial Chambers Map"
      } | string = {};

      if (searchEntry.disc) {
        type.discriminator = searchEntry.disc;
        type.option = searchEntry.type;
      } else {
        type = searchEntry.type;
      }
      tradeSearchRequestData.query.name = searchEntry.name;
      tradeSearchRequestData.query.type = type;
    }

    // Add stats to query if passed
    if (stats?.length > 0) {
      const statsQuery: StatQuery = {
        type: 'and',
        filters: []
      };
      const statsFilter: StatFilter[] = [];
      stats.forEach(x => {
        const filter: StatFilter = {
          disabled: false,
          id: x.item.id,
          value: {}
        };
        if (x.selectedOption) {
          filter.value.option = x.selectedOption.id;
        } else {
          filter.value.min = x.min;
          filter.value.max = x.max;
        }
        statsFilter.push(filter);
      });
      statsQuery.filters = statsFilter;
      tradeSearchRequestData.query.stats = [statsQuery];
    }

    const tradeSearchRequestResponse: TradeSearchDataResponse = await this.httpClient.post<TradeSearchDataResponse>(`https://www.pathofexile.com/api/trade/search/${ league }`, tradeSearchRequestData).toPromise();
    return tradeSearchRequestResponse;
  }

  public async getBulkTradeSearchRequestResult(buyItemType: string, sellItemType: string, minimumStock: number, league: string): Promise<TradeSearchDataResponse> {

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

    console.log('tradeSearchRequestResponse from getBulkTradeSearchRequestResult: ', tradeSearchRequestResponse);
    return tradeSearchRequestResponse;
  }

  public async getFinalTradeSearchResult(query: string): Promise<any> {
    const finalTradeSearchResponse: any = await this.httpClient.get<any>(`https://www.pathofexile.com/api/trade/fetch/${ query }`).toPromise();
    console.log('finalTradeSearchResponse from getFinalTradeSearchResult: ', finalTradeSearchResponse);
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
