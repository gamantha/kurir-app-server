'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Items', 'country', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Items', 'city', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Items', 'address', {
        type: Sequelize.STRING,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Users', 'country'),
      queryInterface.removeColumn('Users', 'city'),
      queryInterface.removeColumn('Users', 'address'),
    ];
  },
};
