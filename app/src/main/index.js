import { app, BrowserWindow, ipcMain } from 'electron'
import mailer from './mail'
import store from './store'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

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

  // 发送邮件事件
  ipcMain.on('sendMail', (e, data) => {
    mailer(data, (info) => {
      e.sender.send('mailResult', info)
    })
  })

  // 更新本地task记录事件
  ipcMain.on('updateProjects', (e, data) => {
    store(data, (info) => {
      e.sender.send('projectResult', info)
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
