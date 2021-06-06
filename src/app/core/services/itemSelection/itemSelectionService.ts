import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Stat from '../../../pages/single/itemstat/stat';
import { ItemEntry, ItemType } from '../api/interfaces/PoeBulkItemData';

@Injectable({
  providedIn: 'root'
})
export class ItemSelectionService {
  // bulk subjects
  private itemTypesSubject$ = new BehaviorSubject<ItemType[]>([]);
  private selectedBuyItemTypeSubject$ = new BehaviorSubject<ItemType>(null);
  private selectedSellItemTypeSubject$ = new BehaviorSubject<ItemType>(null);
  private selectedSellItemSubject$ = new BehaviorSubject<{ entry: ItemEntry, srcElement?: any }>(null);
  private selectedBuyItemSubject$ = new BehaviorSubject<{ entry: ItemEntry, srcElement?: any }>(null);

  // single subjects
  private itemSearchTextSubject$ = new BehaviorSubject<string>('');
  private itemSearchStatsSubject$ = new BehaviorSubject<Stat[]>([]);

  // bulk obs
  public itemTypes$ = this.itemTypesSubject$.asObservable();
  public selectedBuyItemType$ = this.selectedBuyItemTypeSubject$.asObservable();
  public selectedSellItemType$ = this.selectedSellItemTypeSubject$.asObservable();
  public selectedSellItem$ = this.selectedSellItemSubject$.asObservable();
  public selectedBuyItem$ = this.selectedBuyItemSubject$.asObservable();

  // single obs
  public itemSearchText$ = this.itemSearchTextSubject$.asObservable();
  public itemSearchStats$ = this.itemSearchStatsSubject$.asObservable();

  constructor() { }

  // START bulk fns
  public setBuyItemType(itemType: ItemType): void {
    this.selectedBuyItemTypeSubject$.next(itemType);
  }

  public setSellItemType(itemType: ItemType): void {
    this.selectedSellItemTypeSubject$.next(itemType);
  }

  public setSelectedBuyItem(item: { entry: ItemEntry, srcElement?: any }): void {
    this.selectedBuyItemSubject$.next(item);
  }

  public setSelectedSellItem(item: { entry: ItemEntry, srcElement?: any }): void {
    this.selectedSellItemSubject$.next(item);
  }

  public setItemTypes(itemTypes: ItemType[]): void {
    this.itemTypesSubject$.next(itemTypes);
  }
  // END bulk fns

  // START single fns
  public setItemSearchText(text: string): void {
    this.itemSearchTextSubject$.next(text);
  }

  public setItemStats(stats: Stat[]): void {
    this.itemSearchStatsSubject$.next(stats);
  }

  public clearSingleFilter(): void {
    this.itemSearchTextSubject$.next('');
    this.itemSearchStatsSubject$.next([]);
  }
  // END bulk fns
}
