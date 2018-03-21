'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Items', 'reserved', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('Items', 'reserved')];
  }
};
