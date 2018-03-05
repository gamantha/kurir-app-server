const models = require('../models');
const random = require('../helpers');

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
  const ticketNumber = random.refreshToken();
  // const cost = null;
  models.Item.create({
    from,
    to,
    weight,
    country,
    city,
    address,
    senderId: res.locals.user.id,
    ticketNumber,
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

methods.get = (req, res) => {
  models.Item.findAll({
    include: [
      {
        model: models.Sender,
        include: [
          {
            model: models.User,
            attributes: { exclude: ['password', 'forgotPassVeriCode'] },
          },
        ],
      },
      { model: models.Receiver },
      { model: models.Courier },
    ],
  }).then(items => {
    res.json({
      meta: {
        success: true,
        message: 'operation success',
      },
      data: items,
    });
  });
};

module.exports = methods;
