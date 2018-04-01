'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('CourierProposals', 'bankAccount', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('CourierProposals', 'phone', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('CourierProposals', 'address', {
        type: Sequelize.STRING,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('CourierProposals', 'bankAccount'),
      queryInterface.removeColumn('CourierProposals', 'phone'),
      queryInterface.removeColumn('CourierProposals', 'address'),
    ];
  },
};
