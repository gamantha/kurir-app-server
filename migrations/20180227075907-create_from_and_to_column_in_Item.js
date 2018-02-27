'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Items', 'from', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Items', 'to', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Items', 'isCanceled', {
        type: Sequelize.BOOLEAN,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Users', 'from'),
      queryInterface.removeColumn('Users', 'to'),
      queryInterface.removeColumn('Users', 'isCanceled'),
    ];
  },
};
