'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.removeColumn('Items', 'deadline')];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.addColumn('Items', 'deadline', {
      type: Sequelize.STRING
    })];
  }
};