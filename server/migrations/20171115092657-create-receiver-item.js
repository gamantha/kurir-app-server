

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('ReceiverItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      receiverId: {
        type: Sequelize.INTEGER,
      },
      itemId: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('ReceiverItems');
  },
};
