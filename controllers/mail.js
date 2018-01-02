// const SMTPConnection = require('nodemailer/lib/smtp-connection');
const nodemailer = require('nodemailer');

const methods = {};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'bhirmbani@gmail.com',
    clientId: '518406956753-qrdaqiqumrhe8t1g6ikdh4d1kl7v3nhs.apps.googleusercontent.com',
    clientSecret: 'e7ee00hwRqc8Z1wZ0A8De9cT',
    refreshToken: '1/MuC91DgJ6fTv_Zfz-fx2_VMtzMb9pQK81tVB1tMb0m4o8TuoclQp_wEe7Z_53_TQ',
  },
});

const mailOptions = {
  from: 'Kurir.id',
  to: 'bhiraws1@gmail.com',
  subject: 'hello',
  text: 'test',
  html: '<b>Hello world?</b>',
};

methods.sendTestEmail = (req, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({ error });
    }
    res.json({ info });
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};

module.exports = methods;
