const models = require('../models');

const methods = {};

methods.create = (req, res) => {
  // sender
  const { senderCity } = req.body;
  const { senderName } = req.body;
  const { senderAddress } = req.body;
  const { senderPhone } = req.body;
  // receiver
  const { receiverCity } = req.body;
  const { receiverName } = req.body;
  const { receiverAddress } = req.body;
  const { receiverPhone } = req.body;
  // item
  const { itemName } = req.body; // what is inside
  const { itemWeight } = req.body; // luggage space
  const { itemValue } = req.body;
  const { itemPrice } = req.body;
  const { itemDeadline } = req.body; // date and time retrieval
  const { isCustomPickupAddress } = req.body; // select location of retrieval
  // pickup
  const { pickupName } = req.body;
  const { pickupNote } = req.body; // senderHome or kurir pickup address
  const { pickupAddress } = req.body; // alamat dari pilihan pickupNote
  models.Sender.create({
    city: senderCity,
    name: senderName,
    address: senderAddress,
    phone: senderPhone,
  }).then((sender, sendErr) => {
    if (sendErr) {
      res.json({ msg: 'gagal di tahap sender', ok: false });
    }
    models.Receiver.create({
      city: receiverCity,
      name: receiverName,
      address: receiverAddress,
      phone: receiverPhone,
    }).then((rcvrErr) => {
      if (rcvrErr) {
        res.json({ msg: 'gagal di tahap receiver', ok: false });
      }
      models.Item.create({
        name: itemName,
        weight: itemWeight,
        value: itemValue,
        deadline: itemDeadline,
        price: itemPrice,
        isCustomPickupAddress,
      }).then((item, itemErr) => {
        if (itemErr) {
          res.json({ msg: 'gagal di tahap item', ok: false });
        }
        models.Pickup.create({
          itemId: item.id,
          senderId: sender.id,
          name: pickupName,
          note: pickupNote,
          address: pickupAddress,
        }).then((pckpErr) => {
          if (pckpErr) {
            res.json({ msg: 'gagal di tahap pickup', ok: false });
          }
        });
        res.json({ msg: 'berhasil menambah package baru', ok: true });
      });
    });
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
      }).then(() => {
        res.json({ msg: 'berhasil ubah jadi punya custom pickup address', ok: true });
      });
    });
};

module.exports = methods;
