import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemFrameComponent } from './item-frame.component';


@NgModule({
  declarations: [ItemFrameComponent],
  imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule, BrowserAnimationsModule],
  exports: [ItemFrameComponent]
})
export class ItemFrameModule { }
