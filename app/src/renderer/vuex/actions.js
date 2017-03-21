import * as types from './mutation-types'

export const updateProject = ({ commit }, data) => {
  commit(types.UPDATE_PROJECT, data)
}

export const addProject = ({ commit }, data) => {
  commit(types.ADD_PROJECT, data)
}
