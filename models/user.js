

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  User.associate = function (models) {
    User.hasOne(models.Sender, { foreignKey: 'userId' });
    User.hasOne(models.Courier, { foreignKey: 'userId' });
  }
  return User;
};
