

module.exports = function (sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    value: DataTypes.STRING,
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
  Item.associate = function (models) {
    Item.belongsTo(models.Sender, { foreignKey: 'senderId' });
    Item.belongsTo(models.Receiver, { foreignKey: 'receiverId' });
    Item.hasMany(models.Droppoint, { foreignKey: 'itemId' });
    Item.hasOne(models.Courier, { foreignKey: 'itemId' });
  };
  return Item;
};
