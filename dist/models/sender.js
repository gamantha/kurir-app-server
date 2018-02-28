'use strict';

module.exports = function (sequelize, DataTypes) {
  var Sender = sequelize.define('Sender', {
    UserId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  });
  Sender.associate = function (models) {
    Sender.belongsTo(models.User);
    Sender.hasMany(models.Reputation, { foreignKey: 'senderId' });
    Sender.hasOne(models.Pickup, { foreignKey: 'senderId' });
    Sender.hasMany(models.Item, { foreignKey: 'senderId' });
  };
  return Sender;
};