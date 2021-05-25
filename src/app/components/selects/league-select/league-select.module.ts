import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { LeagueSelectComponent } from './league-select.component';

@NgModule({
  declarations: [LeagueSelectComponent],
  imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule, BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  exports: [LeagueSelectComponent]
})
export class LeagueSelectModule { }
