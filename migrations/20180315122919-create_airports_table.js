'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Airports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ident: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      coordinates: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      elevation_ft: {
        type: Sequelize.INTEGER,
      },
      continent: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      iso_country: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      iso_region: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      municipality: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gps_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      iata_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      local_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Airports');
  }

};
