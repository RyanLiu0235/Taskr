import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import mailer from './mail'
import Config from 'electron-config'

const config = new Config()

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

const template = [{
  label: 'Edit',
  submenu: [{
    role: 'undo'
  }, {
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    role: 'cut'
  }, {
    role: 'copy'
  }, {
    role: 'paste'
  }, {
    role: 'pasteandmatchstyle'
  }, {
    role: 'delete'
  }, {
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    role: 'reload'
  }, {
    role: 'forcereload'
  }, {
    role: 'toggledevtools'
  }, {
    type: 'separator'
  }, {
    role: 'resetzoom'
  }, {
    role: 'zoomin'
  }, {
    role: 'zoomout'
  }, {
    type: 'separator'
  }, {
    role: 'togglefullscreen'
  }]
}, {
  role: 'window',
  submenu: [{
    role: 'minimize'
  }, {
    role: 'close'
  }]
}, {
  role: 'help',
  submenu: [{
    label: 'Learn More',
    click () { require('electron').shell.openExternal('http://electron.atom.io') }
  }]
}]

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 注册菜单
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  ipcMain.on('getTasks', (e, data) => {
    e.sender.send('tasksResult', config.get('task') || [])
  })

  // 发送邮件事件
  ipcMain.on('sendMail', (e, data) => {
    mailer(data, (info) => {
      e.sender.send('mailResult', info)
    })
  })

  // 更新本地task记录事件
  ipcMain.on('updateProjects', (e, data) => {
    config.set('task', data)
    e.sender.send('projectResult', {
      status: true
    })
  })

  // 存储配置项
  ipcMain.on('saveSetting', (e, data) => {
    config.set('setting', data)
    e.sender.send('saveResult', {
      status: true
    })
  })
}

app.on('ready', createWindow)

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
