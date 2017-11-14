

module.exports = function (sequelize, DataTypes) {
  const Courier = sequelize.define('Courier', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    phone: DataTypes.STRING,
  });
  Courier.associate = function (models) {

  };
  return Courier;
};
