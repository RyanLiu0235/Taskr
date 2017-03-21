import * as types from './mutation-types'

export const updateProjects = ({ commit }, data) => {
  commit(types.UPDATE_PROJECTS, data)
}
