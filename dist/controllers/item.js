'use strict';

var models = require('../models');

var methods = {};

methods.create = function (req, res) {
  // sender
  var senderCity = req.body.senderCity;
  var senderName = req.body.senderName;
  var senderAddress = req.body.senderAddress;
  var senderPhone = req.body.senderPhone;
  // receiver

  var receiverCity = req.body.receiverCity;
  var receiverName = req.body.receiverName;
  var receiverAddress = req.body.receiverAddress;
  var receiverPhone = req.body.receiverPhone;
  // item

  var itemName = req.body.itemName; // what is inside

  var itemWeight = req.body.itemWeight; // luggage space

  var itemValue = req.body.itemValue;
  var itemPrice = req.body.itemPrice;
  var itemDeadline = req.body.itemDeadline; // date and time retrieval

  var isCustomPickupAddress = req.body.isCustomPickupAddress; // select location of retrieval
  // pickup

  var pickupName = req.body.pickupName;
  var pickupNote = req.body.pickupNote; // senderHome or kurir pickup address

  var pickupAddress = req.body.pickupAddress; // alamat dari pilihan pickupNote

  models.Sender.create({
    city: senderCity,
    name: senderName,
    address: senderAddress,
    phone: senderPhone
  }).then(function (sender, sendErr) {
    if (sendErr) {
      res.json({ msg: 'gagal di tahap sender', ok: false });
    }
    models.Receiver.create({
      city: receiverCity,
      name: receiverName,
      address: receiverAddress,
      phone: receiverPhone
    }).then(function (rcvrErr) {
      if (rcvrErr) {
        res.json({ msg: 'gagal di tahap receiver', ok: false });
      }
      models.Item.create({
        name: itemName,
        weight: itemWeight,
        value: itemValue,
        deadline: itemDeadline,
        price: itemPrice,
        isCustomPickupAddress: isCustomPickupAddress
      }).then(function (item, itemErr) {
        if (itemErr) {
          res.json({ msg: 'gagal di tahap item', ok: false });
        }
        models.Pickup.create({
          itemId: item.id,
          senderId: sender.id,
          name: pickupName,
          note: pickupNote,
          address: pickupAddress
        }).then(function (pckpErr) {
          if (pckpErr) {
            res.json({ msg: 'gagal di tahap pickup', ok: false });
          }
        });
        res.json({ msg: 'berhasil menambah package baru', ok: true });
      });
    });
  });
};

methods.itemHasCustomPickupAddress = function (req, res) {
  models.Item.findOne({
    where: {
      id: req.params.itemId
    }
  }).then(function (item) {
    item.update({
      isCustomPickupAddress: true
    });
  }).then(function () {
    models.Pickup.create({
      itemId: req.body.itemId,
      senderId: req.body.senderId,
      name: req.body.name,
      note: req.body.note,
      address: req.body.address
    }).then(function () {
      res.json({ msg: 'berhasil ubah jadi punya custom pickup address', ok: true });
    });
  });
};

module.exports = methods;