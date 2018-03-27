'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Items', 'orderId', 'ticketNumber');
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Items', 'ticketNumber', 'orderId');
  }
};