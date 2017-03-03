'use strict'

import {app, screen, BrowserWindow, globalShortcut, Tray, Menu} from 'electron'
import './menu';

let tray = null;
let mainWindow = null;

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function toggleWindow() {
  if (mainWindow === null) {
    createWindow();
    return;
  }

  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
  }
}

function createTray() {
  tray = new Tray(`${__dirname}/images/trayTemplate.png`);
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle Jogich',
      accelerator: 'CmdOrCtrl+Alt+G',
      click() {
        toggleWindow();
      }
    },
    {
      type: 'separator'
    },
    {
      role: 'quit'
    }
  ]);
  tray.setToolTip('Jogich');
  tray.setContextMenu(trayMenu);
}

function createWindow() {
  /**
   * Initial window options
   */
 const {width, height} = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    height,
    width,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
  });

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
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
  app.dock.hide();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
