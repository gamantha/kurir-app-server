

module.exports = function (sequelize, DataTypes) {
  const Droppoint = sequelize.define('Droppoint', {
    itemId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.ENUM('start', 'end'),
  });
  Droppoint.associate = function (models) {

  };
  return Droppoint;
};
