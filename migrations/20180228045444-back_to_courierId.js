'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Items', 'CourierId', 'courierId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Items', 'courierId', 'CourierId');
  },
};
