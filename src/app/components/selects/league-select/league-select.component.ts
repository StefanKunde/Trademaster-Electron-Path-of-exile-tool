import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { LeagueData } from '../../../core/services/api/interfaces/PoeLeagueData';
import { LeagueSelectionService } from '../../../core/services/leagueSelection/leagueSelectionService';
import { DisposableComponent } from '../../../disposable-component';

@Component({
  selector: 'app-league-select',
  templateUrl: './league-select.component.html',
  styleUrls: ['./league-select.component.scss']
})
export class LeagueSelectComponent extends DisposableComponent implements OnInit {
  public items: LeagueData[] = [];
  public selected: LeagueData;


  constructor(private readonly leagueSelectionService: LeagueSelectionService) {
    super();
  }

  ngOnInit(): void {
    this.leagueSelectionService.leagues$
      .pipe(takeUntil(this.disposed))
      .subscribe((leagues) => {
        this.items = leagues;
      });

    this.leagueSelectionService.selectedLeague$
      .pipe(takeUntil(this.disposed))
      .subscribe((league) => {
        this.selected = league;
      });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public selectionChange(event: any): void {
    const selectedLeague: LeagueData = {
      id: event.value
    };
    this.leagueSelectionService.setSelectedLeague(selectedLeague);
  }

}

