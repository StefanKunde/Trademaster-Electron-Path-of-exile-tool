import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { ItemSelectionService } from './core/services/itemSelection/itemSelectionService';
import { ApiService } from './core/services/api/apiService';
import { Router } from '@angular/router';
import { LeagueSelectionService } from './core/services/leagueSelection/leagueSelectionService';
import { takeUntil } from 'rxjs/operators';
import { DisposableComponent } from './disposable-component';
import { LeagueData } from './core/services/api/interfaces/PoeLeagueData';
import { UserSettings } from '../../main-process/settings/settings.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends DisposableComponent implements OnInit {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private apiService: ApiService,
    private itemSelectionService: ItemSelectionService,
    private leagueSelectionService: LeagueSelectionService,
    private router: Router
  ) {
    super();
    this.translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.initializeLeagues();
    this.initializeItemTypes();

    this.electronService.loadedSettings$
      .pipe(takeUntil(this.disposed))
      .subscribe((settings) => {
        this.initSettings(settings);
      });
  }

  public hideWindow(): void {
    this.electronService.hideWindow();
  }

  public exitApp(): void {
    this.electronService.exitApp();
  }

  public showHomePage(): void {
    this.router.navigateByUrl('/home');
  }

  public showSettingsPage(): void {
    this.router.navigateByUrl('/settings/general');
  }

  public async initializeItemTypes(): Promise<void> {
    const itemTypes = await this.apiService.getPoeBulkItemData();
    this.itemSelectionService.setItemTypes(itemTypes);
  }

  public async initializeLeagues(): Promise<void> {
    const leagues = await this.apiService.getCurrentLeagues();
    this.leagueSelectionService.setLeagues(leagues);
    // Set default league
    if (leagues?.length >= 2 && !this.leagueSelectionService.fetchedLeagueFromSettings) {
      this.leagueSelectionService.setSelectedLeague(leagues[2], false);
    }
  }

  public initSettings(settings: UserSettings): void {
    if (settings?.league) {
      this.leagueSelectionService.fetchedLeagueFromSettings = true;
      const league: LeagueData = {
        id: settings.league
      };
      this.leagueSelectionService.setSelectedLeague(league);
    }
  }
}
