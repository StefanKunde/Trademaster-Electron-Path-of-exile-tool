import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BulkComponent } from './bulk.component';

const routes: Routes = [
  {
    path: 'bulk',
    component: BulkComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkRoutingModule { }
