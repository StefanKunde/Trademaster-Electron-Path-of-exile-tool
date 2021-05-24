import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { ItemSelectionService } from './core/services/itemSelection/itemSelectionService';
import { ApiService } from './core/services/api/apiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private apiService: ApiService,
    private itemSelectionService: ItemSelectionService
  ) {
    this.translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.initializeItemTypes();
  }

  public hideWindow(): void {
    this.electronService.hideWindow();
  }

  public exitApp(): void {
    this.electronService.exitApp();
  }

  public async initializeItemTypes(): Promise<void> {
    const itemTypes = await this.apiService.getPoeBulkItemData();
    this.itemSelectionService.setItemTypes(itemTypes);
  }

  public closeNotification(): void {
    const notification = document.getElementById('notification');
    notification.classList.add('hidden');
  }

  public restartApp(): void {
    this.electronService.restartApp();
  }
}
