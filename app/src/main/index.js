'use strict'

import {app, screen, BrowserWindow, globalShortcut} from 'electron'
import './menu';

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
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
    const win = BrowserWindow.getAllWindows()[0];
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  });
}

app.on('ready', () => {
  createWindow()
  registerGlobalShortcut();
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
