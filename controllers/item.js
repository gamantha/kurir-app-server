const models = require('../models');

const methods = {};

methods.create = (req, res) => {
  const {
    from,
    to,
    weight,
    country,
    city,
    address,
    name,
    email,
    phone,
  } = req.body;
  const ticketNumber = null;
  const cost = null;
  models.Item.create({
    from,
    to,
    weight,
    country,
    city,
    address,
    senderId: res.locals.user.id,
  }).then(item => {
    models.Receiver.create({
      name,
      email,
      phone,
    }).then(receiver => {
      item.update({
        ReceiverId: receiver.id,
      });
      res.json({ item, receiver });
    });
  });
};

module.exports = methods;
