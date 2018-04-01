'use strict';

module.exports = function (sequelize, DataTypes) {
  var CourierProposal = sequelize.define('CourierProposal', {
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING, // @param {String} waiting, verified, rejected
    proposeDate: DataTypes.DATE,
    rejectDate: DataTypes.DATE,
    acceptDate: DataTypes.DATE,
    rejectReason: DataTypes.STRING,
    bankAccount: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    idLink: DataTypes.STRING,
    photoLink: DataTypes.STRING
  });
  CourierProposal.associate = function (models) {
    CourierProposal.belongsTo(models.User);
  };
  return CourierProposal;
};