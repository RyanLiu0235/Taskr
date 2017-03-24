import * as types from '../mutation-types'

const state = {
  server: {
    host: '',
    auth: {
      user: '',
      pass: ''
    }
  },
  mailOptions: {
    from: '', // 发送人
    to: '', // 发送人
    cc: '', // 抄送
    subject: '' // 标题
  },
  metas: '',
  state: {
    save: false,
    get: false
  }
}

const mutations = {
  [types.SAVE_SETTING] (state, data) {
    state.state.save = data
  },
  [types.GET_SETTING] (state, data) {
    state.state.get = data.status
    state.server = data.server
    state.mailOptions = data.mailOptions
    state.metas = data.metas
  }
}

export default {
  state,
  mutations
}
