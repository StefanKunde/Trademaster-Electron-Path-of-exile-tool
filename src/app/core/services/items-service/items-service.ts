import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../api/interfaces/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private itemsSubject$ = new BehaviorSubject<Item[]>([]);

  public items$ = this.itemsSubject$.asObservable();

  constructor() { }

  public seItems(items: Item[]): void {
    this.itemsSubject$.next(items);
  }
}
