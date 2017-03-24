const fs = require('fs')

const storePath = './data'
const path = {
  task: '/store.json',
  setting: '/setting.json'
}
/**
 * 本地存储任务
 *
 * @param  {Object}   data
 * @param  {Function} cb
 */
export const save = function (data, type, cb) {
  fs.writeFile(`${storePath}${path[type]}`, JSON.stringify(data), (err) => {
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
export const get = function (type, cb) {
  fs.readFile(`${storePath}${path[type]}`, 'utf8', (err, data) => {
    if (err) {
      return cb({
        status: false,
        data: err
      })
    }
    data = JSON.parse(data)
    return cb({
      status: true,
      data
    })
  })
}
