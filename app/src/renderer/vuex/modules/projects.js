import * as types from '../mutation-types'

const state = {
  projects: [{
    tid: 100000000000,
    name: '项目1',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '由于bugfix，项目delay',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000001,
    name: '项目1',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000002,
    name: '项目1',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000003,
    name: '项目1',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000004,
    name: '项目1',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }]
}

const mutations = {
  [types.UPDATE_PROJECTS] (state, data) {
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
  }
}

export default {
  state,
  mutations
}
