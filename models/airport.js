module.exports = function (sequelize, DataTypes) {
  const Airport = sequelize.define('Airport', {
    ident: DataTypes.STRING,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    coordinates: DataTypes.STRING,
    elevation_ft: DataTypes.STRING,
    continent: DataTypes.STRING,
    iso_country: DataTypes.STRING,
    iso_region: DataTypes.STRING,
    municipality: DataTypes.STRING,
    gps_code: DataTypes.STRING,
    iata_code: DataTypes.STRING,
    local_code: DataTypes.STRING,
  }, {
      timestamps: false
    }
  );
  return Airport;
};
