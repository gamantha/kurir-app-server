module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    forgotPassVeriCode: DataTypes.STRING,
  });
  User.associate = function (models) {
    User.hasMany(models.Sender, { foreignKey: 'userId' });
    User.hasOne(models.Courier, { foreignKey: 'userId' });
  };
  return User;
};
