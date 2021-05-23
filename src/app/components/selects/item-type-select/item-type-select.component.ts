import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ItemType } from '../../../core/services/api/interfaces/PoeBulkItemData';
import { ItemSelectionService } from '../../../core/services/itemSelection/itemSelectionService';
import { DisposableComponent } from '../../../disposable-component';

@Component({
  selector: 'app-item-type-select',
  templateUrl: './item-type-select.component.html',
  styleUrls: ['./item-type-select.component.scss']
})
export class ItemTypeSelectComponent extends DisposableComponent implements OnInit {
  @Input() type: string;

  /** list of banks */
  protected itemTypes: ItemType[] = [];

  /** control for the selected bank */
  public itemTypeCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public itemTypeFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredItemTypes: ReplaySubject<ItemType[]> = new ReplaySubject<ItemType[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private readonly itemSelectionService: ItemSelectionService) {
    super();
  }

  ngOnInit(): void {
    this.itemSelectionService.itemTypes$.subscribe(itemTypes => {
      this.itemTypes = itemTypes;
      // set initial selection
      this.itemTypeCtrl.setValue(this.itemTypes[0]);

      // load the initial itemType list
      this.filteredItemTypes.next(this.itemTypes.slice());
    });

    this.itemTypeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterItemTypes();
      });

    this.itemTypeCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((value) => {
        if (this.type?.toLowerCase() === 'buy') {
          this.itemSelectionService.setBuyItemType(value);
        } else {
          this.itemSelectionService.setSellItemType(value);
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
    this.filteredItemTypes
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
    if (!this.itemTypes) {
      return;
    }
    // get the search keyword
    let search = this.itemTypeFilterCtrl.value;
    if (!search) {
      this.filteredItemTypes.next(this.itemTypes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the itemTypes
    this.filteredItemTypes.next(
      this.itemTypes.filter(itemType => itemType.label.toLowerCase().indexOf(search) > -1)
    );
  }

}

