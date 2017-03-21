const fs = require('fs')

export default function (data, cb) {
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
