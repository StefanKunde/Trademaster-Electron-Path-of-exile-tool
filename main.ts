import { app, BrowserWindow, ipcMain, globalShortcut, Tray } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import * as robotjs from 'robotjs';
import { createMainWindow } from './main-process/main-window';
import { autoUpdater } from 'electron-updater';
import { Menu } from 'electron/main';
import { nativeImage } from 'electron/common';
import { IpcChannelInterface } from './main-process/ipc/ipc-channel.interface';
import { HideWindowChannel } from './main-process/ipc/hide-window.channel';
import { ExitAppChannel } from './main-process/ipc/exit-app.channel';
import { SendTradeMessageChannel } from './main-process/ipc/send-trade-message.channel';
import { RestartAppAndUpdateChannel } from './main-process/ipc/restart-app-update.channel';

// Initialize remote module
require('@electron/remote/main').initialize();
export let mainWindow: BrowserWindow | null = null;

const trayIcon = path.join(app.getAppPath(), 'dist/assets/icons/favicon-16x16.png');
const trayIconImage = nativeImage.createFromPath(trayIcon);
let tray = null;

const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

const init = (ipcChannels: IpcChannelInterface[]) => {
  app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
  app.disableHardwareAcceleration();

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 800));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    app.quit();
  });


  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
  });
  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
  });


  registerIpcChannels(ipcChannels);
};

const registerIpcChannels = (ipcChannels: IpcChannelInterface[]) => {
  ipcChannels.forEach(channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)));
};

const createTrayMenu = (): void => {
  tray = new Tray(trayIconImage);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Quit', click: function () {
        app.quit();
      }
    }
  ]);
  tray.setContextMenu(contextMenu);
};

const createWindow = (): void => {

  // Create the browser window.
  mainWindow = createMainWindow(serve);
  createTrayMenu();

  mainWindow.on('close', function () {
    app.quit();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  globalShortcut.register('CommandOrControl+Q', () => {
    mainWindow.show();
  });
};

init([
  new RestartAppAndUpdateChannel(),
  new HideWindowChannel(),
  new ExitAppChannel(),
  new SendTradeMessageChannel()
]);

