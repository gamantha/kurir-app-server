

module.exports = function (sequelize, DataTypes) {
  const Sender = sequelize.define('Sender', {
    userId: DataTypes.INTEGER,
  });
  Sender.associate = function (models) {
    Sender.hasMany(models.Reputation, { foreignKey: 'senderId' });
    Sender.hasOne(models.Pickup, { foreignKey: 'senderId' });
  };
  return Sender;
};
