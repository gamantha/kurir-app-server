'use strict';
module.exports = (sequelize, DataTypes) => {
  var Token = sequelize.define('Token', {
    accessToken: {
      type: DataTypes.TEXT,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    userAgent: {
      type: DataTypes.STRING,
    },
  });
  Token.associate = function (models) {
    // associations can be defined here
    Token.belongsTo(models.User, { foreignKey: 'userId' });
  }
  return Token;
};