'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Items', 'receiverId', 'ReceiverId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Items', 'ReceiverId', 'receiverId');
  },
};
