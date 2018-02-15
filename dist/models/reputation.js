'use strict';

module.exports = function (sequelize, DataTypes) {
  var Reputation = sequelize.define('Reputation', {
    courierId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    comment: DataTypes.STRING
  });
  Reputation.associate = function (models) {
    Reputation.belongsTo(models.Courier, { foreignKey: 'courierId ' });
    Reputation.belongsTo(models.Sender, { foreignKey: 'senderId ' });
  };
  return Reputation;
};