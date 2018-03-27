'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.renameColumn('Items', 'price', 'cost'), queryInterface.renameColumn('Items', 'value', 'reward')];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.renameColumn('Items', 'cost', 'price'), queryInterface.renameColumn('Items', 'reward', 'value')];
  }
};