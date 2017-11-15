

module.exports = function (sequelize, DataTypes) {
  const Droppoint = sequelize.define('Droppoint', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM('start', 'end'),
  });
  Droppoint.associate = function (models) {

  };
  return Droppoint;
};
