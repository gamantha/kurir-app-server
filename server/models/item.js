

module.exports = function (sequelize, DataTypes) {
  let Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN,
  });
  Item.associate = function (models) {

  };
  return Item;
};
