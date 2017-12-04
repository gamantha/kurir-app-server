

module.exports = function (sequelize, DataTypes) {
  const Admin = sequelize.define('Admin', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isDroppoint: DataTypes.BOOLEAN,
  });
  Admin.associate = function (models) {
    Admin.hasOne(models.Droppoint, { foreignKey: 'adminId' });
  }
  return Admin;
};
