'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Droppoints', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('Droppoints', 'userId')];
  },
};
