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
    state.state.get = data
  }
}

export default {
  state,
  mutations
}
