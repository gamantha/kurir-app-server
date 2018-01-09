module.exports = function (sequelize, DataTypes) {
  const Receiver = sequelize.define('Receiver', {
    city: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
  });
  Receiver.associate = function (models) {};
  return Receiver;
};
