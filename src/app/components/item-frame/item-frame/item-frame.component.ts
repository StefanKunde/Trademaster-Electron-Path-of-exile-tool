import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FrameType, PoeItemResult } from '../../../core/services/api/interfaces/PoeItemResult';
import { ItemSelectionService } from '../../../core/services/itemSelection/itemSelectionService';
import { DisposableComponent } from '../../../disposable-component';

@Component({
  selector: 'app-item-frame',
  templateUrl: './item-frame.component.html',
  styleUrls: ['./item-frame.component.scss']
})
export class ItemFrameComponent extends DisposableComponent implements OnInit {
  private tradeItem: PoeItemResult;
  public frameLeftSrc: string;
  public frameMidSrc: string;
  public frameRightSrc: string;


  constructor(
    private readonly itemSelectionService: ItemSelectionService) {
    super();
  }

  ngOnInit(): void {
    this.itemSelectionService.itemCurrentTradeResult$
      .pipe(takeUntil(this.disposed))
      .subscribe(x => { if (!x) return; console.log('item: ', x); this.tradeItem = x; this.initItem(); });
  }

  private initItem(): void {
    this.initFrame();
  }

  private initFrame(): void {
    switch (this.tradeItem.item.frameType) {
      case FrameType.Normal: {
        break;
      }
      case FrameType.Magic: {
        break;
      }
      case FrameType.Rare: {
        break;
      }
      case FrameType.Unique: {
        console.log('detected unique item!');
        this.frameLeftSrc = 'assets/items/header-unique-left.png';
        this.frameMidSrc = 'assets/items/header-unique-middle.png';
        this.frameRightSrc = 'assets/items/header-unique-right.png';
        break;
      }
      case FrameType.Unique_Relict: {
        break;
      }
      case FrameType.Gem: {
        break;
      }
      case FrameType.Divination_Card: {
        break;
      }
      case FrameType.Prophecy: {
        break;
      }
      case FrameType.Quest_Item: {
        break;
      }
      default:
        console.log('default reached... :(');
    }
  }
}
