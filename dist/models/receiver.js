'use strict';

module.exports = function (sequelize, DataTypes) {
  var Receiver = sequelize.define('Receiver', {
    city: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  });
  Receiver.associate = function (models) {};
  return Receiver;
};