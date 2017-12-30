// also for user
const models = require('../models');
const bcrypt = require('bcrypt');
const helper = require('../helpers');

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
  }).then((user) => {
    models.Sender.create({
      userId: user.id,
    }).then((sender) => {
      res.json({ sender, msg: 'berhasil membuat sender baru', ok: true });
    });
  });
};

methods.login = (email, password, next) => {
  models.User.findOne({
    where: { email },
  }).then((user) => {
    if (!user) {
      next(null, { msg: 'email salah/tidak tersedia', ok: false });
    } else if (bcrypt.compareSync(password, user.password)) {
      const userData = Object.assign({
        name: user.name,
        id: user.id,
        ok: true,
      });
      next(null, {
        token: helper.createJWT(userData),
        ok: true,
        msg: `berhasil login dengan email ${email}`,
      });
    } else {
      next(null, { msg: 'password salah', ok: false });
    }
  });
};

methods.getUsers = (req, res) => {
  models.User.findAll().then((users) => {
    console.log(users);
    res.json({ users });
  });
};

module.exports = methods;