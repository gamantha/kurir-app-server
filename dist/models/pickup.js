'use strict';

module.exports = function (sequelize, DataTypes) {
  var Pickup = sequelize.define('Pickup', {
    itemId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    note: DataTypes.STRING,
    address: DataTypes.STRING
  });
  return Pickup;
};