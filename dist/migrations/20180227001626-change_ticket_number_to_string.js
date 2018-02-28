'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.changeColumn('Items', 'orderId', {
      type: Sequelize.STRING
    })];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.changeColumn('Items', 'orderId', {
      type: Sequelize.STRING
    })];
  }
};