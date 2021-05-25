"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMainWindow = void 0;
var electron_1 = require("electron");
var electron_overlay_window_1 = require("electron-overlay-window");
exports.createMainWindow = function (serve) {
    // Create the browser window.
    var win = new electron_1.BrowserWindow(__assign(__assign({ maxWidth: 800, maxHeight: 600, minHeight: 250, minWidth: 300, width: 300, height: 250 }, electron_overlay_window_1.overlayWindow.WINDOW_OPTS), { webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            allowRunningInsecureContent: true,
            contextIsolation: false,
            enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
        } }));
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/../node_modules/electron")
        });
        win.loadURL('http://localhost:4200');
        electron_overlay_window_1.overlayWindow.attachTo(win, 'Path of Exile');
        win.webContents.openDevTools();
    }
    else {
        electron_overlay_window_1.overlayWindow.attachTo(win, 'Path of Exile');
        win.loadURL("file://" + electron_1.app.getAppPath() + "/dist/index.html");
    }
    return win;
};
