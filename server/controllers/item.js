const models = require('../models');

const methods = {};

methods.create = (req, res) => {
  const { name } = req.body;
  models.Item.create({
    name,
  })
    .then((item, err) => {
      if (err) {
        res.json({ msg: 'gagal create item', ok: false });
      }
      res.json({ msg: 'berhasil menambah item baru', ok: true });
    });
};

module.exports = methods;
