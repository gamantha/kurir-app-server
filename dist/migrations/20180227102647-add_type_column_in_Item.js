'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.addColumn('Items', 'type', {
      type: Sequelize.STRING
    })];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.removeColumn('Items', 'type')];
  }
};