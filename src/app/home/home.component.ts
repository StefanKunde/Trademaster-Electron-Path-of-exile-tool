import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import TradeHandler from '../core/handler/trade-handler';
import { ApiService } from '../core/services/api/apiService';
import { ItemEntry, ItemType } from '../core/services/api/interfaces/PoeBulkItemData';
import { LeagueData } from '../core/services/api/interfaces/PoeLeagueData';
import { CacheService } from '../core/services/cache/cacheService';
import { ElectronService } from '../core/services/electron/electron.service';
import { ItemSelectionService } from '../core/services/itemSelection/itemSelectionService';
import { LeagueSelectionService } from '../core/services/leagueSelection/leagueSelectionService';
import { DisposableComponent } from '../disposable-component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends DisposableComponent implements OnInit {
  public buySummaryDefaultText = "Make your choice...";
  public sellSummaryDefaultText = "Make your choice...";
  public selectedBuyItemType: ItemType = null;
  public selectedSellItemType: ItemType = null;
  public selectedSellItem: { entry: ItemEntry, srcElement?: any } = null;
  public selectedBuyItem: { entry: ItemEntry, srcElement?: any } = null;
  public minimumStock = 1;
  public showBuyIcons = false;
  public showSellIcons = false;
  public selectedLeague: LeagueData;

  constructor(
    private readonly itemSelectionService: ItemSelectionService,
    private readonly apiService: ApiService,
    private readonly cacheService: CacheService,
    private readonly electronService: ElectronService,
    private readonly leagueSelectionService: LeagueSelectionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.itemSelectionService.selectedBuyItemType$
      .pipe(takeUntil(this.disposed))
      .subscribe((selectedBuyItemType) => {
        this.selectedBuyItemType = selectedBuyItemType;
        this.setIconVisibility(selectedBuyItemType, 'buy');
      });

    this.itemSelectionService.selectedSellItemType$
      .pipe(takeUntil(this.disposed))
      .subscribe((selectedSellItemType) => {
        this.selectedSellItemType = selectedSellItemType;
        this.setIconVisibility(selectedSellItemType, 'sell');
      });

    this.itemSelectionService.selectedBuyItem$
      .pipe(takeUntil(this.disposed))
      .subscribe((selectedBuyItem) => {
        this.selectedBuyItem = selectedBuyItem;
      });

    this.itemSelectionService.selectedSellItem$
      .pipe(takeUntil(this.disposed))
      .subscribe((selectedSellItem) => {
        this.selectedSellItem = selectedSellItem;
      });

    this.leagueSelectionService.selectedLeague$
      .pipe(takeUntil(this.disposed))
      .subscribe((league) => {
        this.selectedLeague = league;
      });
  }

  selectItem(event, item: ItemEntry, type: string): void {
    if (type === 'sell') {
      if (this.selectedSellItem?.entry?.id === item.id) {
        event.srcElement.classList.remove("selected");
        this.selectedSellItem = null;
      } else {
        // remove old selected element item
        if (this.selectedSellItem) {
          this.selectedSellItem.srcElement?.classList?.remove("selected");
        }

        event.srcElement.classList.add("selected");
        this.selectedSellItem = {
          entry: item,
          srcElement: event.srcElement
        };
        this.itemSelectionService.setSelectedSellItem(this.selectedSellItem);

      }
    } else {
      if (this.selectedBuyItem?.entry?.id === item.id) {
        event.srcElement.classList.remove("selected");
        this.selectedBuyItem = null;
      } else {
        // remove old selected element item
        if (this.selectedBuyItem) {
          this.selectedBuyItem.srcElement?.classList?.remove("selected");
        }

        event.srcElement.classList.add("selected");
        this.selectedBuyItem = {
          entry: item,
          srcElement: event.srcElement
        };
        this.itemSelectionService.setSelectedBuyItem(this.selectedBuyItem);
      }
    }
  }

  public async nextOffer(): Promise<void> {
    let nextOffer: string;
    if (this.cacheService.has('tradehandler', this.selectedBuyItem.entry.id + this.selectedSellItem.entry.id + this.selectedLeague?.id) && this.cacheService.get<TradeHandler>('tradehandler', this.selectedBuyItem.entry.id + this.selectedSellItem.entry.id + this.selectedLeague?.id).minimumStock === this.minimumStock) {
      console.log('has cache!');
      const tradeHandlerCached = this.cacheService.get<TradeHandler>('tradehandler', this.selectedBuyItem.entry.id + this.selectedSellItem.entry.id + this.selectedLeague?.id);
      nextOffer = await tradeHandlerCached.getNextTradeWhisper();
      this.cacheService.set('tradehandler', this.selectedBuyItem.entry.id + this.selectedSellItem.entry.id + this.selectedLeague?.id, tradeHandlerCached);

      if (this.cacheService.get<TradeHandler>('tradehandler', this.selectedBuyItem.entry.id + this.selectedSellItem.entry.id + this.selectedLeague?.id).resultIds.length <= 0) {
        this.cacheService.remove('tradehandler', this.selectedBuyItem.entry.id + this.selectedSellItem.entry.id + this.selectedLeague?.id);
      }

    } else {
      console.log('has no cache!');
      const tradeSearchDataResponse = await this.apiService.getPoeTradeSearchRequestResult(this.selectedBuyItem.entry.id, this.selectedSellItem.entry.id, this.minimumStock, this.selectedLeague?.id);
      const tradeHandler = new TradeHandler(this.selectedBuyItem.entry.id, this.selectedSellItem.entry.id, this.minimumStock, tradeSearchDataResponse);
      nextOffer = await tradeHandler.getNextTradeWhisper();
      this.cacheService.set('tradehandler', this.selectedBuyItem.entry.id + this.selectedSellItem.entry.id + this.selectedLeague?.id, tradeHandler);
    }
    console.log('nextOffers: ', nextOffer);
    this.electronService.sendTradeMessage(nextOffer);
  }

  private setIconVisibility(itemType: ItemType, type: string) {
    let showIcons = false;
    const isType_maps = itemType?.label?.toLowerCase().search('map') > -1;
    const isType_cards = itemType?.label?.toLowerCase().search('cards') > -1;
    const isType_prophecies = itemType?.label?.toLowerCase().search('prophecies') > -1;
    showIcons = !isType_maps && !isType_cards && !isType_prophecies;

    if (type?.toLowerCase() === 'buy') {
      this.showBuyIcons = showIcons;
    } else if (type?.toLowerCase() === 'sell') {
      this.showSellIcons = showIcons;
    }
  }

}
