import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeRoutingModule } from './home-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ItemTypeSelectModule } from '../components/selects/item-type-select/item-type-select.module';
import { ItemSelectModule } from '../components/selects/item-select/item-select.module';
import { NextOfferDisplayModule } from '../components/next-offer-display/next-offer-display.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, FlexLayoutModule, MatExpansionModule, MatButtonModule, MatInputModule, ItemTypeSelectModule, ItemSelectModule, NextOfferDisplayModule]
})
export class HomeModule { }
