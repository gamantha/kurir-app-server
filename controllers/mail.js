const nodemailer = require('nodemailer');
const models = require('../models');
const randtoken = require('rand-token').generator({
  source: 'math',
  chars: 'numeric',
});

const verifCode = randtoken.generate(6);

const methods = {};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'bhirmbani@gmail.com',
    clientId: process.env.nodeMailerClientId,
    clientSecret: process.env.nodeMailerclientSecret,
    refreshToken: process.env.nodeMailerRefreshToken,
  },
});

methods.forgotPassword = (req, res) => {
  models.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      res.json({
        msg: 'Anda memasukkan email yang belum terdaftar. Silakan daftar lebih dulu',
        ok: false,
      });
    } else {
      const mailOptions = {
        from: 'Kurir.id',
        to: `${req.body.email}`,
        subject: 'hello',
        text: 'test',
        html: `<b>this is your verification code: </b>${verifCode}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json({ error });
        }
        res.json({ info, verifCode });
      });
    }
  });
};

module.exports = methods;
