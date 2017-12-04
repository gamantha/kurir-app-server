

module.exports = function (sequelize, DataTypes) {
  const Trip = sequelize.define('Trip', {
    courierId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    date: DataTypes.STRING,
    hour: DataTypes.STRING,
    type: DataTypes.ENUM('train', 'plane', 'car'),
  });
  Trip.associate = function (models) {
    Trip.belongsTo(models.Courier, { foreignKey: 'courierId' });
  }
  return Trip;
};
