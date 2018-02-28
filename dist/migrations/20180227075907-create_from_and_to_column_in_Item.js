'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.addColumn('Items', 'from', {
      type: Sequelize.STRING
    }), queryInterface.addColumn('Items', 'to', {
      type: Sequelize.STRING
    }), queryInterface.addColumn('Items', 'isCanceled', {
      type: Sequelize.BOOLEAN
    })];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.removeColumn('Items', 'from'), queryInterface.removeColumn('Items', 'to'), queryInterface.removeColumn('Items', 'isCanceled')];
  }
};