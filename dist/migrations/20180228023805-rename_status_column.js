'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return [queryInterface.renameColumn('Items', 'statusMsg', 'status')];
  },

  down: function down(queryInterface, Sequelize) {
    return [queryInterface.renameColumn('Items', 'status', 'statusMsg')];
  }
};