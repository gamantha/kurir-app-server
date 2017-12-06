

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderId: {
        type: Sequelize.INTEGER,
      },
      courierId: {
        type: Sequelize.INTEGER,
      },
      senderId: {
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      receiverId: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      name: {
        type: Sequelize.STRING,
      },
      deadline: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      statusMsg: {
        type: Sequelize.STRING,
      },
      isCustomPickupAddress: {
        type: Sequelize.BOOLEAN,
      },
      isExpensive: {
        type: Sequelize.BOOLEAN,
      },
      isOnFirstDropsite: {
        type: Sequelize.BOOLEAN,
      },
      isPicked: {
        type: Sequelize.BOOLEAN,
      },
      isOnStartDroppoint: {
        type: Sequelize.BOOLEAN,
      },
      isOnTravel: {
        type: Sequelize.BOOLEAN,
      },
      isOnEndDroppoint: {
        type: Sequelize.BOOLEAN,
      },
      isOnTheWayToReceiver: {
        type: Sequelize.BOOLEAN,
      },
      isReceived: {
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
    return queryInterface.dropTable('Items');
  },
};
