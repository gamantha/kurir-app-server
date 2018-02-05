module.exports = function(sequelize, DataTypes) {
  const Pickup = sequelize.define('Pickup', {
    itemId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    note: DataTypes.STRING,
    address: DataTypes.STRING,
  });
  return Pickup;
};
