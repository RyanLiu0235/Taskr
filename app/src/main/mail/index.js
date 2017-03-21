import nodemailer from 'nodemailer'
import { server, mailOptions } from './config.mail'

const transporter = nodemailer.createTransport(server)

/**
 * 整理、发送邮件
 *
 * @param  {Array}   data
 * @param  {Function} cb
 */
export default function (data, cb) {
  mailOptions['html'] = genTable(data)
  // 发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return cb({
        status: false
      })
    }
    return cb({
      status: true,
      info
    })
  })
}

/**
 * 依据列表生成表格
 *
 * @param  {Array} list
 * @return {String}
 */
function genTable (list) {
  const thead = '<thead>' +
    '<tr>' +
    '<th>项目</th>' +
    '<th>版本号</th>' +
    '<th>进度</th>' +
    '<th>备注</th>' +
    '</tr>' +
    '</thead>'

  const tbody = '<tbody>' +
    list.map((item, index) =>
      '<tr>' +
      `<td>${item.name}</td>` +
      `<td>${item.version}</td>` +
      `<td>${item.progress}</td>` +
      `<td>${item.remarks}</td>` +
      '</tr>'
    ) +
    '</tbody>'

  return '<table>' +
    thead +
    tbody +
    '</table>'
}
