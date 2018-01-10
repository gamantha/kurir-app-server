module.exports = function (sequelize, DataTypes) {
  const Courier = sequelize.define('Courier', {
    userId: DataTypes.INTEGER,
    idUrl: DataTypes.STRING,
    isHasItem: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    isPaid: DataTypes.BOOLEAN,
    isBlocked: DataTypes.BOOLEAN,
    isEmployee: DataTypes.BOOLEAN,
  });
  Courier.associate = function (models) {
    Courier.hasMany(models.Trip, { foreignKey: 'courierId' });
    Courier.hasMany(models.Item, { foreignKey: 'courierId' });
    Courier.hasMany(models.Reputation, { foreignKey: 'courierId' });
  };
  return Courier;
};
