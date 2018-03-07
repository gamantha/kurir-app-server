'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Items', 'statusMsg'),
      queryInterface.removeColumn('Items', 'categoryId'),
      queryInterface.dropTable('Categories'),
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
      queryInterface.addColumn('Items', 'statusMsg', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Items', 'categoryId', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.removeColumn('Items', 'status'),
      queryInterface.removeColumn('Items', 'category'),

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
      }),
    ];
  },
};
