'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CourierProposals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      proposeDate: {
        type: Sequelize.DATE
      },
      rejectDate: {
        type: Sequelize.DATE
      },
      acceptDate: {
        type: Sequelize.DATE
      },
      rejectReason: {
        type: Sequelize.STRING
      },
      idLink: {
        type: Sequelize.STRING
      },
      photoLink: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CourierProposals');
  }
};