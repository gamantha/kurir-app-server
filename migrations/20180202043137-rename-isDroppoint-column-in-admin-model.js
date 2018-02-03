'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Admins', 'isDroppoint', 'role');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Admins', 'role', 'isDroppoint');
  },
};
