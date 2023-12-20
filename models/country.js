const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    static associate(models) {
      country.hasMany(models.users, { foreignKey: 'countryId' });
    }
  }
  country.init(
    {
      name: DataTypes.STRING,
      key: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      countryCode: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'country',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  // eslint-disable-next-line no-unused-vars
  country.associate = function (models) {};
  return country;
};
