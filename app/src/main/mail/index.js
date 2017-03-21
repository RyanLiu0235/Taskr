import nodemailer from 'nodemailer'
import { server, mailOptions, metas } from './config.mail'
import { style } from './style.json'

const transporter = nodemailer.createTransport(server)

/**
 * 整理、发送邮件
 *
 * @param  {Array}   data
 * @param  {Function} cb
 */
export default function (data, cb) {
  mailOptions['html'] = genHtml(data)
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
 * 生成邮件正文
 */
function genHtml (data) {
  const regards = 'Dear All:'
  const table = genTable(data)
  const _metas = metas.map((item) => `<p class="regards-item">${item}</p>`).join('')

  return `<style type="text/css">${style}</style>` +
    regards +
    table +
    _metas
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
    ).join('') +
    '</tbody>'

  return '<table ' +
    'class="table table-bordered table-hover table-striped" ' +
    'style="width: 600px">' +
    thead +
    tbody +
    '</table>'
}
