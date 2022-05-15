import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ItemEntrySearch } from '../../../core/services/api/interfaces/Item';
import { ItemsService } from '../../../core/services/items-service/items-service';
import { ItemSelectionService } from '../../../core/services/itemSelection/itemSelectionService';
import { DisposableComponent } from '../../../disposable-component';

@Component({
  selector: 'app-item-input-autocomplete',
  templateUrl: './item-input-autocomplete.component.html',
  styleUrls: ['./item-input-autocomplete.component.scss']
})
export class ItemInputAutocompleteComponent extends DisposableComponent implements OnInit {
  myControl = new FormControl();
  options: ItemEntrySearch[] = [];
  filteredOptions: Observable<string[]>;
  selectedItem: ItemEntrySearch;
  searchValue: string;

  constructor(
    private readonly itemsService: ItemsService,
    private readonly itemSelectionService: ItemSelectionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.itemsService.items$
      .pipe(takeUntil(this.disposed))
      .subscribe((items) => {
        const optionsTmp: ItemEntrySearch[] = [];
        items.forEach(cat => {
          cat.entries.forEach(entry => {
            optionsTmp.push(entry);
          });
        });
        this.options = optionsTmp;
      });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        takeUntil(this.disposed),
        tap(text => text.text ? this.itemSelectionService.setItemSearchText(text.text) : this.itemSelectionService.setItemSearchText(text)),
        map(text => text.text ? this._filter(text.text) : text ? this._filter(text) : this.options.slice(0, 0))
      );

    this.itemSelectionService.itemSearchText$
      .pipe(takeUntil(this.disposed))
      .subscribe((text) => {
        if (!text) {
          this.searchValue = '';
        }
      });
  }

  displayFn(item: string): string {
    return item;
  }

  public changeOption(item: ItemEntrySearch): void {
    console.log('item: ', item);
    this.selectedItem = item;
    this.itemSelectionService.setItemSearchItemEntry(item);
  }

  private _filter(text: string): any[] {
    const filterValue = text.toLowerCase();
    return this.options.filter(option => option.text.toLowerCase().includes(filterValue)).slice(0, 10);
  }
}

