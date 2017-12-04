const models = require('../models');

const methods = {};

methods.create = (req, res) => {
  const { name } = req.body;
  const { deadline } = req.body;
  const { price } = req.body;
  const { value } = req.body;
  const { note } = req.body;
  const { weight } = req.body;
  models.Item.create({
    name,
    deadline,
    price,
    value,
    note,
    weight,
  })
    .then((item, err) => {
      if (err) {
        res.json({ msg: 'gagal create item', ok: false });
      }
      res.json({ msg: 'berhasil menambah item baru', ok: true });
    });
};

module.exports = methods;
