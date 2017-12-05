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

methods.itemHasCustomPickupAddress = (req, res) => {
  models.Item.findOne({
    where: {
      id: req.params.itemId,
    },
  })
    .then((item) => {
      item.update({
        isCustomPickupAddress: true,
      });
    })
    .then(() => {
      models.Pickup.create({
        itemId: req.body.itemId,
        senderId: req.body.senderId,
        name: req.body.name,
        note: req.body.note,
        address: req.body.address,
      })
        .then(() => {
          res.json({ msg: 'berhasil ubah jadi punya custom pickup address', ok: true });
        });
    });
};

module.exports = methods;
