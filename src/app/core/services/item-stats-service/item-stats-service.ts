import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StatType } from '../api/interfaces/PoeStatsData';

@Injectable({
  providedIn: 'root'
})
export class ItemStatsService {
  private itemStatsSubject$ = new BehaviorSubject<StatType[]>([]);

  public itemStats$ = this.itemStatsSubject$.asObservable();

  constructor() { }

  public seItemStats(itemStats: StatType[]): void {
    this.itemStatsSubject$.next(itemStats);
  }
}
