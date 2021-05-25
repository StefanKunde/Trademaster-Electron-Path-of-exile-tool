import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { GeneralComponent } from './general.component';
import { LeagueSelectModule } from '../../../components/selects/league-select/league-select.module';

@NgModule({
  declarations: [GeneralComponent],
  imports: [CommonModule, FlexLayoutModule, MatExpansionModule, MatButtonModule, MatInputModule, LeagueSelectModule]
})
export class GeneralModule { }
