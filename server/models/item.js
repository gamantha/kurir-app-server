

module.exports = function (sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isOnDroppoint: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isReceived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Item.associate = function (models) {
    Item.belongsToMany(models.Sender, { through: 'SenderItem', foreignKey: 'itemId' });
    Item.belongsToMany(models.Receiver, { through: 'ReceiverItem', foreignKey: 'itemId' });
    Item.hasMany(models.Droppoint, { foreignKey: 'itemId' });
    Item.hasOne(models.Courier, { foreignKey: 'itemId' });
  };
  return Item;
};
