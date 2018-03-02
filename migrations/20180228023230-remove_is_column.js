'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Items', 'isExpensive'),
      queryInterface.removeColumn('Items', 'isOnFirstDropsite'),
      queryInterface.removeColumn('Items', 'isPicked'),
      queryInterface.removeColumn('Items', 'isOnStartDroppoint'),
      queryInterface.removeColumn('Items', 'isOnTravel'),
      queryInterface.removeColumn('Items', 'isOnEndDroppoint'),
      queryInterface.removeColumn('Items', 'isOnTheWayToReceiver'),
      queryInterface.removeColumn('Items', 'isReceived'),
      queryInterface.removeColumn('Items', 'isCanceled'),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Items', 'isExpensive', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('Items', 'isOnFirstDropsite', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('Items', 'isPicked', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('Items', 'isOnStartDroppoint', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('Items', 'isOnTravel', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('Items', 'isOnEndDroppoint', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('Items', 'isOnTheWayToReceiver', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('Items', 'isReceived', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('Items', 'isCanceled', {
        type: Sequelize.BOOLEAN,
      }),
    ];
  },
};
