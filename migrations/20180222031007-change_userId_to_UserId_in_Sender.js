'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Senders', 'userId', 'UserId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Senders', 'UserId', 'userId');
  },
};
