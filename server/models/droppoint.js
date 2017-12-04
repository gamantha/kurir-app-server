

module.exports = function (sequelize, DataTypes) {
  const Droppoint = sequelize.define('Droppoint', {
    itemId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    position: DataTypes.ENUM('start', 'end'),
    status: DataTypes.ENUM('predefined', 'userdefined'),
    address: DataTypes.STRING,
  });
  Droppoint.associate = function (models) {
    Droppoint.belongsTo(models.Item, { foreignKey: 'itemId' });
  };
  return Droppoint;
};
