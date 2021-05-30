import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import TradeHandler from '../../core/handler/trade-handler';
import { ApiService } from '../../core/services/api/apiService';
import { ItemEntry } from '../../core/services/api/interfaces/PoeBulkItemData';
import { PoeItemResult } from '../../core/services/api/interfaces/PoeItemResult';
import { LeagueData } from '../../core/services/api/interfaces/PoeLeagueData';
import { CacheService } from '../../core/services/cache/cacheService';
import { ElectronService } from '../../core/services/electron/electron.service';
import { ItemSelectionService } from '../../core/services/itemSelection/itemSelectionService';
import { LeagueSelectionService } from '../../core/services/leagueSelection/leagueSelectionService';
import { DisposableComponent } from '../../disposable-component';

@Component({
  selector: 'app-next-offer-display-select',
  templateUrl: './next-offer-display.component.html',
  styleUrls: ['./next-offer-display.component.scss']
})
export class NextOfferDisplayComponent extends DisposableComponent implements OnInit {
  @Input() currentTradeHandler: TradeHandler;
  public selectedSellItem: { entry: ItemEntry, srcElement?: any } = null;
  public selectedBuyItem: { entry: ItemEntry, srcElement?: any } = null;
  public selectedLeague: LeagueData;
  public buyItemImage: string;
  public sellItemImage: string;
  public loadedTradehandler = false;
  public sliderMaxVal: number;
  public sliderValue: number;
  public minimumStock: number;
  public sellerName: string;
  public lastPassedSliderVal: number;
  public sliderSteps: number;
  public hasMoreResults: boolean;
  public infoContent = "No available trades";
  public hasCleanPrices: boolean;
  public hasCleanPricesOption: boolean;

  public currentSellAmount: number;
  public currentBuyAmount: number;
  public currentPriceForOne: number;


  constructor(
    private readonly cacheService: CacheService, private readonly apiService: ApiService,
    private readonly electronService: ElectronService, private readonly itemSelectionService: ItemSelectionService, private readonly leagueSelectionService: LeagueSelectionService) {
    super();
    this.hasCleanPricesOption = true;
  }

  private ngOnChanges(changes: any) {
    if (changes.currentTradeHandler !== this.currentTradeHandler && changes.currentTradeHandler.currentValue) {
      this.currentTradeHandler = changes.currentTradeHandler.currentValue;
      this.loadedTradehandler = true;

      this.initValues();
    }
  }

  private initValues(): void {
    let currentResult: PoeItemResult;
    if (this.currentTradeHandler?.resultIds?.length > 0) {
      this.hasMoreResults = true;
      currentResult = this.currentTradeHandler.currentResult;
      this.buyItemImage = currentResult.item.icon;
      this.sellItemImage = this.cacheService.get('image', currentResult.listing.price.exchange.currency);
      this.sellerName = currentResult.listing.account.lastCharacterName;
      this.currentPriceForOne = (Number(this.currentTradeHandler.buyAmount) / Number(this.currentTradeHandler.sellAmount));
      this.currentSellAmount = this.currentTradeHandler.price;
      this.sliderMaxVal = currentResult.listing.price.item.stock;
      this.sliderValue = this.currentTradeHandler.minimumStock;
      this.lastPassedSliderVal = this.sliderValue;
      this.minimumStock = this.currentTradeHandler.minimumStock;

      if (this.selectedSellItem?.entry?.id === 'exalted') {
        this.hasCleanPricesOption = false;
      } else {
        this.hasCleanPricesOption = true;
      }

      this.calculateCleanSteps();
    } else {
      this.hasMoreResults = false;
      this.currentTradeHandler = null;
    }
  }

  ngOnInit(): void {
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

  public setSlidervalue(event: any): void {
    if (event.value % this.sliderSteps === 0) {
      this.sliderValue = event.value;
      console.log('this.hasCleanPrices: ', this.hasCleanPrices);
      if (this.hasCleanPrices && !(this.selectedBuyItem.entry.id === 'chaos' && this.selectedSellItem.entry.id === 'exalted')) {
        this.currentSellAmount = Math.round(Number((this.sliderValue / this.currentPriceForOne)));
        console.log('this.currentSellAmount: ', this.currentSellAmount);
      } else {
        this.currentSellAmount = Number((this.sliderValue / this.currentPriceForOne).toFixed(2));
      }

      this.lastPassedSliderVal = this.sliderValue;
    } else {
      this.sliderValue = this.lastPassedSliderVal;
    }

  }

  private calculateCleanSteps(): void {
    let firstPassingVal;
    if (this.selectedBuyItem.entry.id === 'chaos' && this.selectedSellItem.entry.id === 'exalted') {
      this.sliderSteps = this.currentPriceForOne;
      this.sliderValue = this.currentPriceForOne;

      this.sliderMaxVal = this.sliderMaxVal - (this.sliderMaxVal % this.sliderSteps);
    } else {
      for (let i = 1; i < this.sliderMaxVal; i++) {
        try {
          const tmpSellAmount = Number((i / this.currentPriceForOne).toFixed(2));
          const condition = tmpSellAmount % 1 === 0 || (tmpSellAmount % 1 * 10 % 1 === 0);
          if (condition && !firstPassingVal) {
            firstPassingVal = i;
            this.sliderSteps = firstPassingVal;
            // set slider max value:
            this.sliderMaxVal = this.sliderMaxVal - (this.sliderMaxVal % this.sliderSteps);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  public cleanPricesHandler(event: any): void {
    this.hasCleanPrices = event.checked;
    if (this.hasCleanPrices) {
      if (!(this.selectedBuyItem.entry.id === 'chaos' && this.selectedSellItem.entry.id === 'exalted')) {
        if (this.currentSellAmount % 1 * 10 < 1 || this.currentSellAmount % 1 * 10 > 9) {
          this.currentSellAmount = Math.round(Number((this.sliderValue / this.currentPriceForOne)));
        } else {
          this.currentSellAmount = Number((this.sliderValue / this.currentPriceForOne).toFixed(1));
        }
      }
    } else {
      this.currentSellAmount = Number((this.sliderValue / this.currentPriceForOne).toFixed(2));
    }
  }

  public async sendOffer() {
    const message = this.currentTradeHandler.getTradeMessage(this.sliderValue, this.currentSellAmount);
    await this.electronService.sendTradeMessage(message);
    await this.skipCurrentTrade();
  }

  public async skipCurrentTrade(): Promise<void> {
    await this.currentTradeHandler.prepareNextTrade();
    this.initValues();
  }

}

