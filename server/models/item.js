

module.exports = function (sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    itemId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN,
    isOnDroppoint: DataTypes.BOOLEAN,
    isReceived: DataTypes.BOOLEAN,
  });
  Item.associate = function (models) {
    Item.belongsToMany(models.Sender, { through: 'SenderItem', foreignKey: 'itemId' });
    Item.belongsToMany(models.Receiver, { through: 'ReceiverItem', foreignKey: 'itemId' });
    Item.hasMany(models.Droppoint, { foreignKey: 'itemId' });
    Item.hasOne(models.Courier, { foreignKey: 'itemId' });
  };
  return Item;
};
