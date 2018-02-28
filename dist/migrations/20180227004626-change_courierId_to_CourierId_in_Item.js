'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Items', 'courierId', 'CourierId');
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.renameColumn('Items', 'CourierId', 'courierId');
  }
};