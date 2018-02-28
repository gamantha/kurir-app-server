'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Items', 'type', {
        type: Sequelize.STRING,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('Items', 'type')];
  },
};
