'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Items', 'receiverId', 'ReceiverId');
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Items', 'ReceiverId', 'receiverId');
  }
};