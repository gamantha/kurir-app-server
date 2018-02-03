'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn('Admins', 'role', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [];
  },
};
