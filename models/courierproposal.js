'use strict';
module.exports = (sequelize, DataTypes) => {
  var CourierProposal = sequelize.define('CourierProposal', {
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING, // @param {String} waiting, verified
    proposeDate: DataTypes.DATE,
    rejectDate: DataTypes.DATE,
    acceptDate: DataTypes.DATE,
    rejectReason: DataTypes.STRING,
    idLink: DataTypes.STRING,
    photoLink: DataTypes.STRING,
  });
  CourierProposal.associate = function(models) {};
  return CourierProposal;
};
