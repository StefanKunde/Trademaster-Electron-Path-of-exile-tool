import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ItemEntry, ItemType } from '../../../core/services/api/interfaces/PoeBulkItemData';
import { ItemSelectionService } from '../../../core/services/itemSelection/itemSelectionService';
import { DisposableComponent } from '../../../disposable-component';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent extends DisposableComponent implements OnInit {
  @Input() type: string;
  public items: ItemEntry[] = [];

  /** control for the selected item */
  public itemTypeCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public itemTypeFilterCtrl: FormControl = new FormControl();

  /** list of items filtered by search keyword */
  public filteredItems: ReplaySubject<ItemEntry[]> = new ReplaySubject<ItemEntry[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private readonly itemSelectionService: ItemSelectionService) {
    super();
  }

  ngOnInit(): void {
    if (this.type?.toLowerCase() === 'buy') {
      this.itemSelectionService.selectedBuyItemType$
        .pipe(takeUntil(this.disposed))
        .subscribe((selectedBuyItemType) => {
          if (selectedBuyItemType?.id) {
            this.items = selectedBuyItemType.entries;
            this.filteredItems.next(this.items.slice());
          }
        });
    } else {
      this.itemSelectionService.selectedSellItemType$
        .pipe(takeUntil(this.disposed))
        .subscribe((selectedSellItemType) => {
          if (selectedSellItemType?.id) {
            this.items = selectedSellItemType.entries;
            this.filteredItems.next(this.items.slice());
          }
        });
    }

    this.itemTypeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterItemTypes();
      });

    this.itemTypeCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((value) => {
        if (value) {
          if (this.type?.toLowerCase() === 'buy') {
            this.itemSelectionService.setSelectedBuyItem({ entry: value });
          } else {
            this.itemSelectionService.setSelectedSellItem({ entry: value });
          }
        }
      });

  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredItemTypes are loaded initially
   */
  protected setInitialValue() {
    this.filteredItems
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredItemTypes are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: ItemType, b: ItemType) => a && b && a.id === b.id;
      });
  }

  protected filterItemTypes() {
    if (!this.items) {
      return;
    }
    // get the search keyword
    let search = this.itemTypeFilterCtrl.value;
    if (!search) {
      this.filteredItems.next(this.items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the itemTypes
    this.filteredItems.next(
      this.items.filter(item => item.text.toLowerCase().indexOf(search) > -1)
    );
  }

}

