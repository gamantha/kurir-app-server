'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.addColumn('Users', 'photoLink', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    })];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.removeColumn('Users', 'photoLink')];
  }
};