

module.exports = function (sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN,
    isThroughDroppoint: DataTypes.BOOLEAN,
  });
  Item.associate = function (models) {

  };
  return Item;
};
