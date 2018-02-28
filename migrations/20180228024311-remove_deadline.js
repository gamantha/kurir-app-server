'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('Items', 'deadline')];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Items', 'deadline', {
        type: Sequelize.STRING,
      }),
    ];
  },
};
