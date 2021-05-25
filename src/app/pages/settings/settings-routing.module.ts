import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { GeneralComponent } from './general/general.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: 'general',
        component: GeneralComponent
      },
      {
        path: 'update',
        component: UpdateComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
