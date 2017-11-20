

module.exports = function (sequelize, DataTypes) {
  const Courier = sequelize.define('Courier', {
    itemId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    isHasItem: DataTypes.BOOLEAN,
    isPaid: DataTypes.BOOLEAN,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  Courier.associate = function (models) {
    Courier.hasOne(models.Trip, { foreignKey: 'courierId' });
  };
  return Courier;
};
