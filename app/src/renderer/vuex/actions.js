import * as types from './mutation-types'
import { ipcRenderer } from 'electron'

export const updateProject = ({ commit }, data) => {
  commit(types.UPDATE_PROJECT, data)
}

export const addProject = ({ commit }, data) => {
  commit(types.ADD_PROJECT, data)
}

export const sendMail = ({ commit }, data) => {
  // 发送邮件请求
  ipcRenderer.send(
    'sendMail',
    getUpdatedProjects(data.data)
  )

  // 等待邮件发送完成
  ipcRenderer.on('mailResult', (e, rst) => {
    commit(types.SEND_MAIL, rst)
  })
}

export const resetMail = ({ commit }) => {
  commit(types.RESET_MAIL)
}

/**
 * 获取本周更新的任务/未完成的任务
 *
 * @param  {Array} list
 * @return {Array}
 */
function getUpdatedProjects (list) {
  const mon = getThisWeek().getTime()

  return list.filter((item) =>
    item.lastModified > mon ||
    item.createdAt > mon
  )
}

/**
 * 获取本周周一起始的时间戳
 *  Mon 00:00:00
 *
 * @return {Date}
 */
function getThisWeek () {
  const now = new Date()

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - (now.getDay() - 1)
  )
}
