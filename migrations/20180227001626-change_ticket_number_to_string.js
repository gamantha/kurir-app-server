'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn('Items', 'orderId', {
        type: Sequelize.STRING,
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn('Items', 'orderId', {
        type: Sequelize.STRING,
      }),
    ];
  },
};
