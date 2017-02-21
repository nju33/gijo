const {app, remote, shell, BowserWindow, Menu} = require('electron')

const template = [
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      // {
      //   label: 'Focus',
      //   click() {
      //     BowserWindow.getAllWindows()[0].focus();
      //   }
      // },
      {
        label: 'reset',
        accelerator: 'Escape',
        click(item, win) {
          win.webContents.send('reset');
        }
      },
      {
        role: 'reload'
      },
      // {
      //   role: 'toggledevtools'
      // },
      // {
      //   type: 'separator'
      // },
      // {
      //   role: 'resetzoom'
      // },
      // {
      //   role: 'zoomin'
      // },
      // {
      //   role: 'zoomout'
      // },
      // {
      //   type: 'separator'
      // },
      // {
      //   role: 'togglefullscreen'
      // }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Github Repo',
        click () {
          shell.openExternal('https://github.com/nju33/jogich');
        }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
  // Edit menu.
  // template[1].submenu.push(
  //   {
  //     type: 'separator'
  //   },
  //   {
  //     label: 'Speech',
  //     submenu: [
  //       {
  //         role: 'startspeaking'
  //       },
  //       {
  //         role: 'stopspeaking'
  //       }
  //     ]
  //   }
  // )
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    // {
    //   label: 'Zoom',
    //   role: 'zoom'
    // },
    // {
    //   type: 'separator'
    // },
    // {
    //   label: 'Bring All to Front',
    //   role: 'front'
    // }
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
