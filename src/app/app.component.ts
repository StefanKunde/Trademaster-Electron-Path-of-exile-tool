import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
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
    console.log('AppConfig', AppConfig);

    if (this.electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
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
}
