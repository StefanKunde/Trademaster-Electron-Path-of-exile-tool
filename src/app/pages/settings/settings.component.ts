import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '../../disposable-component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends DisposableComponent implements OnInit {

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {

  }
}
