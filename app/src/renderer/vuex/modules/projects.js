import * as types from '../mutation-types'

const state = {
  projects: [{
    tid: 100000000000,
    createdAt: 1489990634917,
    name: '项目1',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '由于bugfix，项目delay',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000001,
    createdAt: 1489990634917,
    name: '项目2',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000002,
    createdAt: 1489990634917,
    name: '项目3',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000003,
    createdAt: 1489990634917,
    name: '项目4',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000022,
    createdAt: 1489990634917,
    name: '项目5',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000004,
    createdAt: 1489990634917,
    name: '项目6',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000020,
    createdAt: 1489990634917,
    name: '项目7',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '由于bugfix，项目delay',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000021,
    createdAt: 1489990634917,
    name: '项目8',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000023,
    createdAt: 1489990634917,
    name: '项目8',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }, {
    tid: 100000000024,
    createdAt: 1489990634917,
    name: '项目10',
    version: 'v5.8.6',
    progress: '100%',
    remarks: '',
    completed: false,
    lastModified: 1489906513106
  }]
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
  },
  [types.ADD_PROJECT] (state, data) {
    const temp = data.data
    temp.tid = data.tid
    temp.completed = false

    state.projects = [
      temp,
      ...state.projects
    ]
  }
}

export default {
  state,
  mutations
}
