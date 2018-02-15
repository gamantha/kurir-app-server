'use strict';

module.exports = function (sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING
  });
  Category.associate = function (models) {};
  return Category;
};