import * as types from '../mutation-types'

const state = {
  mailSuccess: false,
  mailResult: {
    accepted: {
      count: 0,
      detail: []
    },
    rejected: {
      count: 0,
      detail: []
    }
  },
  notify: false
}

const mutations = {
  [types.SEND_MAIL] (state, data) {
    const status = data.status
    if (status) {
      const info = data.info
      state.mailResult.accepted.detail = info.accepted
      state.mailResult.accepted.count = info.accepted.length
      state.mailResult.rejected.detail = info.rejected
      state.mailResult.rejected.count = info.rejected.length
      state.mailSuccess = true
    } else {
      state.mailSuccess = false
    }

    state.notify = true
  },
  [types.RESET_MAIL] (state) {
    state.mailSuccess = false
    state.notify = false
    state.mailResult.accepted = {
      count: 0,
      detail: []
    }
    state.mailResult.rejected = {
      count: 0,
      detail: []
    }
  }
}

export default {
  state,
  mutations
}
