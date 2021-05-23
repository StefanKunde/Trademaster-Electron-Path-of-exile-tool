import { app, BrowserWindow } from 'electron';
import { overlayWindow } from 'electron-overlay-window';

export const createMainWindow = (serve: boolean): BrowserWindow => {

  // Create the browser window.
  const win = new BrowserWindow({
    maxWidth: 800,
    maxHeight: 600,
    minHeight: 400,
    minWidth: 300,
    ...overlayWindow.WINDOW_OPTS,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });



  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${ __dirname }/../node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
    overlayWindow.attachTo(win, 'Path of Exile');
    win.webContents.openDevTools();
  } else {
    overlayWindow.attachTo(win, 'Path of Exile');
    win.loadURL(`file://${ app.getAppPath() }/dist/index.html`);
  }

  return win;
};
