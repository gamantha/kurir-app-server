'use strict';

var _require = require('../config/config.test.json'),
    user = _require.user,
    sysadmin = _require.sysadmin;

var bcrypt = require('bcrypt');

module.exports = {
  up: function up(queryInterface, Sequelize) {
    var saltRounds = 10;
    var userHash = bcrypt.hashSync(user.password, saltRounds);
    var sysadminHash = bcrypt.hashSync(sysadmin.password, saltRounds);
    return queryInterface.bulkInsert('Users', [{
      email: user.email,
      username: user.username,
      password: userHash,
      role: 'sender',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      email: sysadmin.email,
      username: sysadmin.username,
      password: sysadminHash,
      role: 'sysadmin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }]);
  },

  down: function down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      email: 'test@development.com'
    }]);
  }
};