'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Senders', 'userId', 'UserId');
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Senders', 'UserId', 'userId');
  }
};