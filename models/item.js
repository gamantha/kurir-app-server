module.exports = function (sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    ticketNumber: DataTypes.STRING,
    courierId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    ReceiverId: DataTypes.INTEGER,
    from: DataTypes.STRING,
    originCoord: DataTypes.STRING,
    to: DataTypes.STRING,
    destinationCoord: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    type: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    name: DataTypes.STRING,
    cost: DataTypes.STRING,
    reward: DataTypes.STRING,
    note: DataTypes.STRING,
    reserved: DataTypes.DATE,
    // @params status
    // stillWaitingCourier,firstDropsite,pickedByCourier,startDroppoint,onTravel,endDroppoint,ontheway,received,canceled
    status: DataTypes.STRING,
  });
  Item.associate = function (models) {
    Item.belongsTo(models.Sender, { foreignKey: 'senderId' });
    Item.belongsTo(models.Receiver);
    Item.belongsTo(models.Courier, { foreignKey: 'courierId' });
    Item.hasMany(models.Droppoint, { foreignKey: 'itemId' });
    Item.hasOne(models.Pickup, { foreignKey: 'itemId' });
  };
  return Item;
};
