const { user, sysadmin } = require('../config/config.test.json');

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const saltRounds = 10;
    const userHash = bcrypt.hashSync(user.password, saltRounds);
    const sysadminHash = bcrypt.hashSync(sysadmin.password, saltRounds);
    return queryInterface.bulkInsert('Users', [
      {
        email: user.email,
        username: user.username,
        password: userHash,
        role: 'sender',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        email: sysadmin.email,
        username: sysadmin.username,
        password: sysadminHash,
        role: 'sysadmin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', [{
      email: 'test@development.com',
    }]);
  },
};
