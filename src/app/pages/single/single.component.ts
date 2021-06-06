import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import SingleTradeHandler from '../../core/handler/single-trade-handler';
import { ApiService } from '../../core/services/api/apiService';
import { ItemEntrySearch } from '../../core/services/api/interfaces/Item';
import { LeagueData } from '../../core/services/api/interfaces/PoeLeagueData';
import { StatType } from '../../core/services/api/interfaces/PoeStatsData';
import { CacheService } from '../../core/services/cache/cacheService';
import { ItemStatsService } from '../../core/services/item-stats-service/item-stats-service';
import { ItemSelectionService } from '../../core/services/itemSelection/itemSelectionService';
import { LeagueSelectionService } from '../../core/services/leagueSelection/leagueSelectionService';
import { DisposableComponent } from '../../disposable-component';
import Stat from './itemstat/stat';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent extends DisposableComponent implements OnInit {
  public tradehandler: SingleTradeHandler;
  public searchText: string;
  public itemStats: StatType[];
  public selectedLeague: LeagueData;
  public selectedStats: Stat[];
  public selectedItemEntrySearch: ItemEntrySearch;

  constructor(
    private readonly itemStatsService: ItemStatsService,
    private readonly itemSelectionService: ItemSelectionService,
    private readonly apiService: ApiService,
    private readonly leagueSelectionService: LeagueSelectionService,
    private readonly cacheService: CacheService
  ) {
    super();
  }

  ngOnInit(): void {
    this.itemStatsService.itemStats$
      .pipe(takeUntil(this.disposed))
      .subscribe((itemStats) => {
        this.itemStats = itemStats;
      });

    this.leagueSelectionService.selectedLeague$
      .pipe(takeUntil(this.disposed))
      .subscribe((league) => {
        this.selectedLeague = league;
      });

    this.itemSelectionService.itemSearchText$
      .pipe(takeUntil(this.disposed))
      .subscribe((text) => {
        this.searchText = text;
      });

    this.itemSelectionService.itemSearchStats$
      .pipe(takeUntil(this.disposed))
      .subscribe((stats) => {
        this.selectedStats = stats;
      });

    this.itemSelectionService.itemSearchItemEntry$
      .pipe(takeUntil(this.disposed))
      .subscribe((item) => {
        this.selectedItemEntrySearch = item;
      });
  }

  public clearFilter(): void {
    this.itemSelectionService.clearSingleFilter();
  }

  /*
  public async search(): Promise<void> {
    const res = await this.apiService.getSingleTradeSearchRequestResult(this.selectedLeague.id, this.selectedItemEntrySearch, this.selectedStats);
    console.log('res: ', res);
  }
  */

  public async search(): Promise<void> {
    const res = await this.apiService.getSingleTradeSearchRequestResult(this.selectedLeague.id, this.selectedItemEntrySearch, this.selectedStats);
    this.tradehandler = new SingleTradeHandler(res);
    //await this.tradehandler.prepareNextTrade();

  }

  public nextTradeResult(): void {
    console.log('this.tradehandler.getNextTradeWhisper() :', this.tradehandler.getNextTradeWhisper());
  }
}
