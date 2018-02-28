'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.removeColumn('Items', 'isCustomPickupAddress')];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.addColumn('Items', 'isCustomPickupAddress', {
      type: Sequelize.BOOLEAN
    })];
  }
};