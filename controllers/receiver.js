const models = require('../models');

const methods = {};

methods.create = (req, res) => {
  const { name } = req.body;
  const { address } = req.body;
  const { phone } = req.body;
  models.Receiver.create({
    name,
    address,
    phone,
  })
    .then((item) => {
      if (!item) {
        res.json({ msg: 'gagal create receiver', ok: false });
      }
      res.json({ msg: 'berhasil menambah receiver baru', ok: true });
    });
};

module.exports = methods;
