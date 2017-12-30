

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Reputations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      courierId: {
        type: Sequelize.INTEGER,
      },
      senderId: {
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Reputations');
  },
};
