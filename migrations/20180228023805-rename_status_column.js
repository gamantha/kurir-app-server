'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [queryInterface.renameColumn('Items', 'statusMsg', 'status')];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.renameColumn('Items', 'status', 'statusMsg')];
  },
};
