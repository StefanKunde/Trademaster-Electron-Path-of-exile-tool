import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '../../../disposable-component';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent extends DisposableComponent implements OnInit {

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {

  }
}
