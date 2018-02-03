const { user } = require('../config/config.test.json');

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(user.password, saltRounds);
    return queryInterface.bulkInsert('Users', [{
      email: user.email,
      username: user.username,
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }]);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', [{
      email: 'test@development.com',
    }]);
  },
};
