

module.exports = function (sequelize, DataTypes) {
  const Sender = sequelize.define('Sender', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
  });
  Sender.associate = function (models) {
    Sender.hasMany(models.Reputation, { foreignKey: 'senderId' });
    Sender.hasOne(models.Pickup, { foreignKey: 'senderId' });
  };
  return Sender;
};
