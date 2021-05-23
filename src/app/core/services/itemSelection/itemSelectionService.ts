import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemEntry, ItemType } from '../api/interfaces/PoeBulkItemData';

@Injectable({
  providedIn: 'root'
})
export class ItemSelectionService {
  private itemTypesSubject$ = new BehaviorSubject<ItemType[]>([]);
  private selectedBuyItemTypeSubject$ = new BehaviorSubject<ItemType>(null);
  private selectedSellItemTypeSubject$ = new BehaviorSubject<ItemType>(null);
  private selectedSellItemSubject$ = new BehaviorSubject<{ entry: ItemEntry, srcElement?: any }>(null);
  private selectedBuyItemSubject$ = new BehaviorSubject<{ entry: ItemEntry, srcElement?: any }>(null);

  public itemTypes$ = this.itemTypesSubject$.asObservable();
  public selectedBuyItemType$ = this.selectedBuyItemTypeSubject$.asObservable();
  public selectedSellItemType$ = this.selectedSellItemTypeSubject$.asObservable();
  public selectedSellItem$ = this.selectedSellItemSubject$.asObservable();
  public selectedBuyItem$ = this.selectedBuyItemSubject$.asObservable();

  constructor() { }

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
}
