'use strict';
module.exports = (sequelize, DataTypes) => {
  var CourierProposal = sequelize.define('CourierProposal', {
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
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
