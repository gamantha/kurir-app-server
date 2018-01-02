const nodemailer = require('nodemailer');
const randtoken = require('rand-token').generator({
  source: 'math',
  chars: 'numeric',
});
const bcrypt = require('bcrypt');

const verifCode = randtoken.generate(6);

const models = require('../models');

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

methods.getVeriCodeForgotPassword = (req, res) => {
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
      user.update({
        forgotPassVeriCode: verifCode,
      });
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

methods.checkForgotPassVeriCode = (req, res) => {
  models.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user.forgotPassVeriCode === req.body.veriCode) {
      res.json({ msg: 'sama', ok: true });
    } else {
      res.json({ msg: 'tidak sama', ok: false });
    }
  });
};

methods.changePassword = (req, res) => {
  models.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    user
      .update({
        password: hash,
      })
      .then(() => {
        res.json({ msg: 'berhasil ubah password', ok: true });
      });
  });
};

module.exports = methods;
