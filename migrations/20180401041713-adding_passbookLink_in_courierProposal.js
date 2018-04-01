'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('CourierProposals', 'passbookLink', {
        type: Sequelize.STRING,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('CourierProposals', 'passbookLink')];
  },
};
