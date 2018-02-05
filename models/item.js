module.exports = function(sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    orderId: DataTypes.INTEGER,
    courierId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    name: DataTypes.STRING,
    deadline: DataTypes.STRING,
    price: DataTypes.STRING,
    value: DataTypes.STRING,
    note: DataTypes.STRING,
    statusMsg: DataTypes.STRING,
    isCustomPickupAddress: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isExpensive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isOnFirstDropsite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isPicked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isOnStartDroppoint: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isOnTravel: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isOnEndDroppoint: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isOnTheWayToReceiver: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isReceived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Item.associate = function(models) {
    Item.belongsTo(models.Sender, { foreignKey: 'senderId' });
    Item.belongsTo(models.Receiver, { foreignKey: 'receiverId' });
    Item.belongsTo(models.Courier, { foreignKey: 'courierId' });
    Item.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Item.hasMany(models.Droppoint, { foreignKey: 'itemId' });
    Item.hasOne(models.Pickup, { foreignKey: 'itemId' });
  };
  return Item;
};
