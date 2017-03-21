import * as types from './mutation-types'
import { ipcRenderer } from 'electron'

export const updateProject = ({ commit }, data) => {
  commit(types.UPDATE_PROJECT, data)
}

export const addProject = ({ commit }, data) => {
  commit(types.ADD_PROJECT, data)
}

export const sendMail = ({ commit }, data) => {
  ipcRenderer.send('sendMail', data.projects)
  ipcRenderer.on('mailResult', (e, rst) => {
    commit(types.SEND_MAIL, rst)
  })
}

export const resetMail = ({ commit }) => {
  commit(types.RESET_MAIL)
}
