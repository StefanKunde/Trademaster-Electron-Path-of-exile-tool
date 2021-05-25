import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserSettings } from '../../../../../main-process/settings/settings.interface';
import { LeagueData } from '../api/interfaces/PoeLeagueData';
import { ElectronService } from '../electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueSelectionService {
  private leaguesSubject$ = new BehaviorSubject<LeagueData[]>([]);
  private selectedLeagueSubject$ = new BehaviorSubject<LeagueData>(null);

  public leagues$ = this.leaguesSubject$.asObservable();
  public selectedLeague$ = this.selectedLeagueSubject$.asObservable();

  public fetchedLeagueFromSettings = false;

  constructor(private readonly electronService: ElectronService) { }

  public setLeagues(leagues: LeagueData[]): void {
    this.leaguesSubject$.next(leagues);
  }

  public getSelectedLeague(): Promise<LeagueData> {
    return this.selectedLeague$.toPromise();
  }

  public setSelectedLeague(league: LeagueData, ignore?: boolean): void {
    this.selectedLeagueSubject$.next(league);
    const settings: UserSettings = {
      league: league.id
    };

    if (!ignore) {
      this.electronService.saveSettings(settings);
    }

  }

  public setFlagFetchedLeagueFromSettings(): void {
    this.fetchedLeagueFromSettings = true;
  }
}
