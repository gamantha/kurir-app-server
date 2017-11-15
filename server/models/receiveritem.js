

module.exports = function (sequelize, DataTypes) {
  const ReceiverItem = sequelize.define('ReceiverItem', {
    receiverId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
  });
  ReceiverItem.associate = function (models) {

  };
  return ReceiverItem;
};
