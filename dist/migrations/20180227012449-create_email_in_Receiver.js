'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.addColumn('Receivers', 'email', {
      type: Sequelize.STRING
    })];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.removeColumn('Receivers', 'email')];
  }
};