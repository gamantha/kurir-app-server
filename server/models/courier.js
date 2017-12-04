

module.exports = function (sequelize, DataTypes) {
  const Courier = sequelize.define('Courier', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    idUrl: DataTypes.STRING,
    isHasItem: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    isPaid: DataTypes.BOOLEAN,
    isBlocked: DataTypes.BOOLEAN,
    isEmployee: DataTypes.BOOLEAN,
    baggageSpace: DataTypes.FLOAT,
  });
  Courier.associate = function (models) {
    Courier.hasMany(models.Trip, { foreignKey: 'courierId' });
    Courier.hasMany(models.Item, { foreignKey: 'courierId' });
    Courier.hasMany(models.Reputation, { foreignKey: 'courierId' });
  };
  return Courier;
};
