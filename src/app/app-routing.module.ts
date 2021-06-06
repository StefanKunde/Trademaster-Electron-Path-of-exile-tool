import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { SettingsRoutingModule } from './pages/settings/settings-routing.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: './components/tab-route/tab-route.module#TabRouteModule'
  },
  {
    path: 'settings',
    redirectTo: 'settings',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    SettingsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
