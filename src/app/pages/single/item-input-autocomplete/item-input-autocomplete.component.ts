import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
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
  options: string[] = [];
  filteredOptions: Observable<string[]>;
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
        const optionsTmp: string[] = [];
        items.forEach(cat => {
          cat.entries.forEach(entry => {
            optionsTmp.push(entry.text);
          });
        });
        this.options = optionsTmp;
      });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        takeUntil(this.disposed),
        tap(text => this.itemSelectionService.setItemSearchText(text)),
        map(text => text ? this._filter(text) : this.options.slice(0, 0))
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

  private _filter(text: string): any[] {
    const filterValue = text.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue)).slice(0, 10);
  }
}

