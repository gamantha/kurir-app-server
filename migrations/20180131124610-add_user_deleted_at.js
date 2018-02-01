'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'Users',
        'deletedAt', {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        }
      )
    ]
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Users', 'deletedAt')
    ]
  }
};
