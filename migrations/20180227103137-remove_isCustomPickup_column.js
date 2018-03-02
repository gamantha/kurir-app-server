'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('Items', 'isCustomPickupAddress')];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Items', 'isCustomPickupAddress', {
        type: Sequelize.BOOLEAN,
      }),
    ];
  },
};
