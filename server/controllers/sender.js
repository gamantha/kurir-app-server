// also for user
const models = require('../models');
const bcrypt = require('bcrypt');

const methods = {};

methods.create = (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  // const { address } = req.body;
  // const { phone } = req.body;
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  models.User.create({
    name,
    email,
    password: hash,
  })
    .then((user) => {
      models.Sender.create({
        userId: user.id,
      })
        .then((sender) => {
          res.json({ sender, msg: 'berhasil membuat sender baru', ok: true });
        });
    });
};

methods.login = (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
};

module.exports = methods;
