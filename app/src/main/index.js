'use strict';

import {
  app,
  screen,
  BrowserWindow,
  globalShortcut,
  Tray,
  Menu,
  ipcMain
} from 'electron';
import './menu';

let tray = null;
let mainWindow = null;

const log = text => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(text);
  }
};

const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${require('../../../config').port}`
    : `file://${__dirname}/index.html`;

function toggleWindow() {
  if (mainWindow === null) {
    createWindow();
    return;
  }

  // Strange afterimages remain
  if (mainWindow.isVisible()) {
    log('hide');
    mainWindow.webContents.send('hide:req');
  } else {
    log('show');
    mainWindow.webContents.send('show:req');
  }
}

function createTray() {
  tray = new Tray(`${__dirname}/images/trayTemplate.png`);
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle Gijo',
      accelerator: 'CmdOrCtrl+Alt+G',
      click() {
        toggleWindow();
      }
    },
    {
      label: 'Reset',
      click() {
        if (mainWindow === null) {
          return;
        }
        mainWindow.webContents.send('reset');
      }
    },
    {
      type: 'separator'
    },
    {
      role: 'quit'
    }
  ]);
  tray.setToolTip('Gijo');
  tray.setContextMenu(trayMenu);
}

function createWindow() {
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    height,
    width,
    frame: false,
    transparent: true,
    alwaysOnTop: process.env.NODE_ENV !== 'development',
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false
  });

  log(`winURL: ${winURL}`);
  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Strange afterimages remain
  ipcMain.on('hide:res', () => {
    log(`on 'hide:res'`);
    mainWindow.hide();
  });
  ipcMain.on('show:res', () => {
    log(`on 'show:res'`);
    mainWindow.show();
  });
}

function registerGlobalShortcut() {
  globalShortcut.register('CommandOrControl+Alt+G', () => {
    toggleWindow();
  });
}

app.on('ready', () => {
  createTray();
  // createWindow();
  registerGlobalShortcut();
  if (process.env.NODE_ENV === 'production') {
    app.dock.hide();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
