

module.exports = function (sequelize, DataTypes) {
  const Receiver = sequelize.define('Receiver', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
  });
  Receiver.associate = function (models) {
    Receiver.belongsToMany(models.Item, { through: 'ReceiverItem', foreignKey: 'receiverId' });
  };
  return Receiver;
};
