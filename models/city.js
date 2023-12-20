const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    static associate(models) {
      city.hasMany(models.users, { foreignKey: 'cityId' });
    }
  }
  city.init(
    {
      name: DataTypes.STRING,
      key: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      stateId: DataTypes.INTEGER,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'city',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  // eslint-disable-next-line no-unused-vars
  city.associate = function (models) {};
  return city;
};
