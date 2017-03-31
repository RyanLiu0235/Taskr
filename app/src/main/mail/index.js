import nodemailer from 'nodemailer'
import { style } from './style.json'
import Config from 'electron-config'

const config = new Config()
let setting = {}

/**
 * 整理、发送邮件
 *
 * @param  {Array}   data
 * @param  {Function} cb
 */
export default function (data, cb) {
  setting = config.get('setting')

  const transporter = nodemailer.createTransport(setting.server)
  let mailOptions = setting.mailOptions
  mailOptions.html = genHtml(data)

  // 发送邮件
  // 具体接口数据格式
  // https://nodemailer.com/usage/#sending-mail
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
  const _metas = setting.metas.split('\n').map((item) => `<p class="regards-item">${item}</p>`).join('')

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
