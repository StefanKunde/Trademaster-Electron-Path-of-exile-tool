import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '../../../disposable-component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent extends DisposableComponent implements OnInit {

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {

  }
}
