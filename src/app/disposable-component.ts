import { OnDestroy, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class DisposableComponent implements OnDestroy {
  public disposed: Subject<boolean>;

  constructor() {
    this.disposed = new Subject();
  }

  public ngOnDestroy(): void {
    this.disposed.next(true);
    this.disposed.complete();
  }
}
