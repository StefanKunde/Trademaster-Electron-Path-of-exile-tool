import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame } from 'electron';
import * as remote from '@electron/remote';
import * as childProcess from 'child_process';
import * as fs from 'fs';

interface IpcRequest {
  responseChannel?: string;
  params?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;

      // If you want to use remote object in renderer process, please set enableRemoteModule to true in main.ts
      // this.remote = window.require('@electron/remote');
      // console.log('remote - globalShortcut', this.remote.globalShortcut);

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  public hideWindow(): Promise<void> {
    const request: IpcRequest = {
      params: []
    };

    return this.send<void>('hideWindow', request);
  }

  public exitApp(): Promise<void> {
    const request: IpcRequest = {
      params: []
    };

    return this.send<void>('exitApp', request);
  }

  public sendTradeMessage(message: string): Promise<void> {
    const request: IpcRequest = {
      params: [message]
    };

    return this.send<void>('sendTradeMessage', request);
  }

  public send<T>(channel: string, request: IpcRequest): Promise<T> {
    // If there's no responseChannel let's auto-generate it
    if (!request.responseChannel) {
      request.responseChannel = `${ channel }_response_${ new Date().getTime() }`;
    }

    this.ipcRenderer.send(channel, request);

    // This method returns a promise which will be resolved when the response has arrived.
    return new Promise(resolve => {
      this.ipcRenderer.once(request.responseChannel, (event, response) => resolve(response));
    });
  }
}
