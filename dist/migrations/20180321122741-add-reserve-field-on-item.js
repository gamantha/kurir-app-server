'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.addColumn('Items', 'reserved', {
      type: Sequelize.STRING,
      defaultValue: null
    })];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.removeColumn('Items', 'reserved')];
  }
};