'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Receivers', 'email', {
        type: Sequelize.STRING,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('Receivers', 'email')];
  },
};
