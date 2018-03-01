'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Items', 'isExpensive'),
      queryInterface.removeColumn('Items', 'isPicked'),
      queryInterface.removeColumn('Items', 'isOnStartDroppoint'),
      queryInterface.removeColumn('Items', 'isOnFirstDropsite'),
      queryInterface.removeColumn('Items', 'isOnTravel'),
      queryInterface.removeColumn('Items', 'isOnEndDroppoint'),
      queryInterface.removeColumn('Items', 'isOnTheWayToReceiver'),
      queryInterface.removeColumn('Items', 'isReceived'),
      queryInterface.removeColumn('Items', 'isCanceled'),
      queryInterface.removeColumn('Items', 'statusMsg'),
      queryInterface.removeColumn('Items', 'categoryId'),
      queryInterface.dropTable('Categories'),
      queryInterface.removeColumn('Items', 'CourierId'),
      queryInterface.addColumn('Items', 'courierId', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Items', 'status', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Items', 'category', {
        type: Sequelize.STRING,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Items', 'isExpensive', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Items', 'isPicked', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Items', 'isOnStartDroppoint', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Items', 'isOnFirstDropsite', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Items', 'isOnTravel', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Items', 'isOnEndDroppoint', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Items', 'isOnTheWayToReceiver', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Items', 'isReceived', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Items', 'isCanceled', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Items', 'statusMsg', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Items', 'categoryId', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.removeColumn('Items', 'status'),
      queryInterface.removeColumn('Items', 'category'),

      queryInterface.removeColumn('Items', 'courierId'),
      queryInterface.addColumn('Items', 'CourierId', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.createTable('Categories', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
    ];
  }
};
