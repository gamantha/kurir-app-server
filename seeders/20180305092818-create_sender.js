const { sender } = require('../config/config.test.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Senders', [
      {
        UserId: 1,
        city: sender.city,
        name: sender.name,
        address: sender.address,
        phone: sender.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Senders', [
      {
        UserId: 1,
      },
    ]);
  },
};
