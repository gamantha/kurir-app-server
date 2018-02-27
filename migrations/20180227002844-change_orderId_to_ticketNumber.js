'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Items', 'orderId', 'ticketNumber');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Items', 'ticketNumber', 'orderId');
  },
};
