

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    itemId: DataTypes.INTEGER,
    name: DataTypes.STRING,
  });
  Category.associate = function (models) {
  }
  return Category;
};
