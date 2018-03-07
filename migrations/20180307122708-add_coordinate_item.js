'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Items', 'originCoord', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      }),
      queryInterface.addColumn('Items', 'destinationCoord', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Items', 'originCoord'),
      queryInterface.removeColumn('Items', 'destinationCoord')
    ];
  }
};
