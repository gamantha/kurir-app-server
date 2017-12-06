

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Couriers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      idUrl: {
        type: Sequelize.STRING,
      },
      isHasItem: {
        type: Sequelize.BOOLEAN,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
      },
      isEmployee: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Couriers');
  },
};
