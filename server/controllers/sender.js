const models = require('../models');
const bcrypt = require('bcrypt');

const methods = {};

methods.create = (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { address } = req.body;
  const { phone } = req.body;
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  models.Sender.create({
    name,
    email,
    address,
    password: hash,
    phone,
  })
    .then((sender) => {
      res.json({ sender, msg: 'berhasil membuat sender baru', ok: true });
    });
};

module.exports = methods;
