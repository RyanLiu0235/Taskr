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
    },
    response: ''
  },
  notify: false
}

const mutations = {
  [types.SEND_MAIL] (state, data) {
    // eslint-disable-next-line no-console
    console.log(data)

    state.mailResult.accepted.detail = data.accepted
    state.mailResult.accepted.count = data.accepted.length
    state.mailResult.rejected.detail = data.rejected
    state.mailResult.rejected.count = data.rejected.length
    const response = state.mailResult.response = data.response

    if (response === '250 Ok: queued as ') {
      state.mailSuccess = true
    } else {
      state.mailSuccess = false
    }

    state.notify = true
  }
}

export default {
  state,
  mutations
}
