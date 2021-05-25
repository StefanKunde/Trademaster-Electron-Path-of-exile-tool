import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '../../disposable-component';
import { MenuItem } from './interfaces/menu-item.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends DisposableComponent implements OnInit {
  public menuItems: MenuItem[] = [
    { name: 'General', path: '/settings/general' },
    { name: 'Update', path: '/settings/update' }
  ];
  constructor(
  ) {
    super();
  }

  ngOnInit(): void {

  }


}
