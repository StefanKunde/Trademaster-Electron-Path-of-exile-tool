import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { StatEntry, StatOption } from '../../../core/services/api/interfaces/PoeStatsData';
import { ItemStatsService } from '../../../core/services/item-stats-service/item-stats-service';
import { ItemSelectionService } from '../../../core/services/itemSelection/itemSelectionService';
import { DisposableComponent } from '../../../disposable-component';
import Stat from './stat';

@Component({
  selector: 'app-itemstat',
  templateUrl: './itemstat.component.html',
  styleUrls: ['./itemstat.component.scss']
})
export class ItemStatComponent extends DisposableComponent implements OnInit {
  public myControl = new FormControl();
  public options: StatEntry[] = [];
  public filteredOptions: Observable<StatEntry[]>;
  public searchValue: string;
  public selectedOption: StatEntry;
  public stats: Stat[] = [];


  constructor(
    private readonly itemStatService: ItemStatsService,
    private readonly itemSelectionService: ItemSelectionService
  ) {
    super();
    this.selectedOption = null;
  }

  ngOnInit(): void {
    this.itemStatService.itemStats$
      .pipe(takeUntil(this.disposed))
      .subscribe((itemStats) => {
        const optionsTmp: StatEntry[] = [];
        itemStats.forEach(cat => {
          cat.entries.forEach(entry => {
            optionsTmp.push(entry);
          });
        });
        this.options = optionsTmp;
      });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        takeUntil(this.disposed),
        //tap(text => this.itemSelectionService.setItemSearchText(text)),
        map(text => text ? this._filter(text) : this.options.slice(0, 0))
      );


    this.itemSelectionService.itemSearchStats$
      .pipe(takeUntil(this.disposed))
      .subscribe((stats) => {
        if (stats.length === 0) {
          this.stats = stats;
        }
      });

  }

  displayFn(item: string): string {
    return item;
  }

  private _filter(stat: string): StatEntry[] {
    const filterValue = stat.toLowerCase();
    return this.options.filter(option => option.text.toLowerCase().includes(filterValue)).slice(0, 10);
  }

  public addNewStat(item: StatEntry): void {
    const isDuplicate = this.stats.some(x => {
      return item.id === x.item.id;
    });
    if (isDuplicate) return;

    const newStat: Stat = {
      item,
      isSelected: true,
      hasAdditionalOptions: item.option ? true : false,
      max: '',
      min: ''
    };

    this.stats.push(newStat);
    this.searchValue = '';
    this.itemSelectionService.setItemStats(this.stats);
  }

  public changeOption(option: StatOption, stat: Stat): void {
    const changedStat = this.stats.find((x) => {
      return x.item.id === stat.item.id;
    });
    if (changedStat) {
      changedStat.selectedOption = option;
      changedStat.min = undefined;
      changedStat.max = undefined;
    }

    this.itemSelectionService.setItemStats(this.stats);
  }

  public changeInputValue(event: any, type: string /* 'min' or 'max' */, stat: Stat): void {
    const newVal = event.srcElement.value;
    const changedStat = this.stats.find((x) => {
      return x.item.id === stat.item.id;
    });

    if (type === 'max') {
      changedStat.max = newVal;
      changedStat.selectedOption = undefined;
    } else if (type === 'min') {
      changedStat.min = newVal;
      changedStat.selectedOption = undefined;
    } else {
      console.error('Invalid type while changing input val for stat');
    }

    this.itemSelectionService.setItemStats(this.stats);
  }

  public deleteStat(stat: Stat): void {
    this.stats = this.stats.filter(x => !(x.item.id === stat.item.id));
    this.itemSelectionService.setItemStats(this.stats);
  }
}

