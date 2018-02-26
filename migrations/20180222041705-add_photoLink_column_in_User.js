'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Users', 'photoLink', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('Users', 'photoLink')];
  },
};
