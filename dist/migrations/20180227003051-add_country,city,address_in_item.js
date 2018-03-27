'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.addColumn('Items', 'country', {
      type: Sequelize.STRING
    }), queryInterface.addColumn('Items', 'city', {
      type: Sequelize.STRING
    }), queryInterface.addColumn('Items', 'address', {
      type: Sequelize.STRING
    })];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.removeColumn('Items', 'country'), queryInterface.removeColumn('Items', 'city'), queryInterface.removeColumn('Items', 'address')];
  }
};