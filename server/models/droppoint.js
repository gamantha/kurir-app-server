

module.exports = function (sequelize, DataTypes) {
  const Droppoint = sequelize.define('Droppoint', {
    itemId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    position: DataTypes.ENUM('start', 'end'),
    address: DataTypes.STRING,
    type: DataTypes.ENUM('predefined', 'userdefined'),
  });
  Droppoint.associate = function (models) {

  };
  return Droppoint;
};
