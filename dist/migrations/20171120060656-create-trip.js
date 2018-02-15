'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courierId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      origin: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      hour: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('train', 'plane', 'car')
      },
      baggageSpace: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Trips');
  }
};