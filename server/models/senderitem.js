

module.exports = function (sequelize, DataTypes) {
  const SenderItem = sequelize.define('SenderItem', {
    senderId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
  });
  SenderItem.associate = function (models) {

  };
  return SenderItem;
};
