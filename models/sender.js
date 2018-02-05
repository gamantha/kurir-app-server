module.exports = function(sequelize, DataTypes) {
  const Sender = sequelize.define('Sender', {
    userId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
  });
  Sender.associate = function(models) {
    Sender.belongsTo(models.User, { foreignKey: 'itemId' });
    Sender.hasMany(models.Reputation, { foreignKey: 'senderId' });
    Sender.hasOne(models.Pickup, { foreignKey: 'senderId' });
  };
  return Sender;
};
