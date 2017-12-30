

module.exports = function (sequelize, DataTypes) {
  const Admin = sequelize.define('Admin', {
    droppointId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isDroppoint: DataTypes.BOOLEAN,
  });
  Admin.associate = function (models) {
    Admin.belongsTo(models.Droppoint, { foreignKey: 'droppointId' });
  }
  return Admin;
};
