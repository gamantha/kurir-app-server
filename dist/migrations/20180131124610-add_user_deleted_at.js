'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.addColumn('Users', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.removeColumn('Users', 'deletedAt')];
  }
};