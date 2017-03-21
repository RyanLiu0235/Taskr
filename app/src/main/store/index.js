const fs = require('fs')

/**
 * 本地存储任务
 *
 * @param  {Object}   data
 * @param  {Function} cb
 */
export const storeTasks = function (data, cb) {
  fs.writeFile('./store.json', data, (err) => {
    if (err) {
      return cb({
        status: false,
        data: err
      })
    }
    return cb({ status: true })
  })
}

/**
 * 读取本地存储的任务
 *
 * @param  {Function} cb
 */
export const getTasks = function (cb) {
  fs.readFile('./store.json', 'utf8', (err, data) => {
    if (err) {
      return cb({
        status: false,
        data: err
      })
    }
    return cb({
      status: true,
      data
    })
  })
}
