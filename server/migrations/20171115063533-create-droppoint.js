

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Droppoints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.ENUM('start', 'end'),
      },
      address: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM('predefined', 'userdefined'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Droppoints');
  },
};
