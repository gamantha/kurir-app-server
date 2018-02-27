'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Items', 'courierId', 'CourierId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Items', 'courierId', 'CourierId');
  },
};
