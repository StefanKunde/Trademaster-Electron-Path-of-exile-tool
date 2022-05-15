import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SingleRoutingModule } from './single-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared/shared.module';
import { ItemTypeSelectModule } from '../../components/selects/item-type-select/item-type-select.module';
import { ItemSelectModule } from '../../components/selects/item-select/item-select.module';
import { NextOfferDisplayModule } from '../../components/next-offer-display/next-offer-display.module';
import { SingleComponent } from './single.component';
import { ItemInputAutocompleteModule } from './item-input-autocomplete/item-input-autocomplete.module';
import { ItemStatModule } from './itemstat/itemstat.module';
import { ItemFrameModule } from '../../components/item-frame/item-frame/item-frame.module';

@NgModule({
  declarations: [SingleComponent],
  imports: [CommonModule, SharedModule, SingleRoutingModule, FlexLayoutModule, MatExpansionModule, MatButtonModule, MatInputModule, ItemTypeSelectModule, ItemSelectModule, NextOfferDisplayModule, ItemInputAutocompleteModule, ItemStatModule, ItemFrameModule]
})
export class SingleModule { }
