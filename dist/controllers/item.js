'use strict';

var models = require('../models');

var methods = {};

methods.create = function (req, res) {
  var _req$body = req.body,
      from = _req$body.from,
      to = _req$body.to,
      weight = _req$body.weight,
      country = _req$body.country,
      city = _req$body.city,
      address = _req$body.address,
      name = _req$body.name,
      email = _req$body.email,
      phone = _req$body.phone;

  var ticketNumber = null;
  var cost = null;
  models.Item.create({
    from: from,
    to: to,
    weight: weight,
    country: country,
    city: city,
    address: address,
    senderId: res.locals.user.id
  }).then(function (item) {
    models.Receiver.create({
      name: name,
      email: email,
      phone: phone
    }).then(function (receiver) {
      item.update({
        ReceiverId: receiver.id
      });
      res.json({ item: item, receiver: receiver });
    });
  });
};

module.exports = methods;