import nodemailer from 'nodemailer'
import { server, mailOptions } from './config.mail'

const transporter = nodemailer.createTransport(server)

export default function (data, cb) {
  // 发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return new Error('发送失败')
    }
    return cb(info)
  })
}
