import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../../core/services/api/apiService';
import { StatType } from '../../core/services/api/interfaces/PoeStatsData';
import { ItemStatsService } from '../../core/services/item-stats-service/item-stats-service';
import { ItemSelectionService } from '../../core/services/itemSelection/itemSelectionService';
import { DisposableComponent } from '../../disposable-component';
import Stat from './itemstat/stat';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent extends DisposableComponent implements OnInit {
  public searchText: string;
  public itemStats: StatType[];
  public selectedStats: Stat[];

  constructor(
    private readonly itemStatsService: ItemStatsService,
    private readonly itemSelectionService: ItemSelectionService,
    private readonly apiService: ApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.itemStatsService.itemStats$
      .pipe(takeUntil(this.disposed))
      .subscribe((itemStats) => {
        this.itemStats = itemStats;
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


  }

  public clearFilter(): void {
    this.itemSelectionService.clearSingleFilter();
  }

  public async search(): Promise<void> {
    const res = await this.apiService.getSingleTradeSearchRequestResult('Ultimatum', this.selectedStats);
    console.log('res: ', res);
  }
}
