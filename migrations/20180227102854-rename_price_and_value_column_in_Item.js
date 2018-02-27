'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.renameColumn('Items', 'price', 'cost'),
      queryInterface.renameColumn('Items', 'value', 'reward'),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.renameColumn('Items', 'cost', 'price'),
      queryInterface.renameColumn('Items', 'reward', 'value'),
    ];
  },
};
