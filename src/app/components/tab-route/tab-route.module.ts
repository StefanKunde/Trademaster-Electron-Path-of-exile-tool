import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TabRouteComponent } from './tab-route.component';
import { BulkComponent } from '../../pages/bulk/bulk.component';
import { SingleComponent } from '../../pages/single/single.component';

@NgModule({
  imports: [CommonModule, MatTabsModule, RouterModule.forChild([
    {
      path: '', component: TabRouteComponent, children: [
        { path: '', redirectTo: 'bulk' },
        { path: 'bulk', component: BulkComponent, data: { label: 'Bulk' } },
        { path: 'single', component: SingleComponent, data: { label: 'Single' } }
      ]
    }
  ])],
  declarations: [TabRouteComponent]
})
export class TabRouteModule { }
