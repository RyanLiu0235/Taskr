const fs = require('fs')

export const storeTasks = function (data, cb) {
  fs.writeFile('./store.json', JSON.stringify(data), (err) => {
    if (err) {
      return cb({
        status: false,
        data: err
      })
    }
    return cb({ status: true })
  })
}

export const getTasks = function () {
  fs.readFile('./store.json', 'utf8', (err, data) => {
    if (err) {
      return {
        status: false,
        data: err
      }
    }
    return {
      status: true,
      data
    }
  })
}
