export const server = {
  host: 'smtp.xx.com',
  auth: {
    user: 'johndoe@xx.com',
    pass: 'password'
  }
}

// 接口文档
// https://nodemailer.com/message/#commmon-fields
export const mailOptions = {
  from: 'Jonh Doe <johndoe@xx.com>', // 发送人
  to: 'jessi@xx.com', // 发送人
  cc: 'jasica@xx.com', // 抄送
  bcc: 'jeremy@xx.com', // 密送
  subject: 'hello' // 标题
}

// pure array
export const metas = [
  '----------------------',
  'Yours Sincerely',
  'John Deo',
  'Mobile : 13000000000',
  'E-mail : johndoe@xx.com'
]
