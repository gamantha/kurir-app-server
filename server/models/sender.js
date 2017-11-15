

module.exports = function (sequelize, DataTypes) {
  const Sender = sequelize.define('Sender', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
  });
  Sender.associate = function (models) {
    Sender.belongsToMany(models.Item, { through: 'SenderItem', foreignKey: 'senderId' });
  };
  return Sender;
};
