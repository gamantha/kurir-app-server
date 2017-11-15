

module.exports = function (sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    itemId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN,
    isThroughDroppoint: DataTypes.BOOLEAN,
    isReceived: DataTypes.BOOLEAN,
  });
  Item.associate = function (models) {

  };
  return Item;
};
