import * as types from '../mutation-types'
import { ipcRenderer } from 'electron'

const state = {
  projects: []
}

const mutations = {
  [types.UPDATE_PROJECT] (state, data) {
    const tid = data.tid
    const newData = data.newData
    const projects = state.projects
    const index = projects.findIndex((item) => item.tid === tid)
    const project = projects[index]
    const keys = Object.keys(newData)
    let l = keys.length
    let key
    let value

    // 依次赋予新值
    while (l--) {
      key = keys[l]
      value = newData[key]
      project[key] = value
    }

    state.projects = [
      ...projects.slice(0, index),
      project,
      ...projects.slice(index + 1)
    ]

    ipcRenderer.send('updateProjects', state)
  },
  [types.ADD_PROJECT] (state, data) {
    const temp = data.data
    temp.tid = data.tid
    temp.completed = false

    state.projects = [
      temp,
      ...state.projects
    ]

    ipcRenderer.send('updateProjects', state)
  }
}

export default {
  state,
  mutations
}
