const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class state extends Model {
    static associate(models) {
      state.hasMany(models.users, { foreignKey: 'stateId' });
    }
  }
  state.init(
    {
      name: DataTypes.STRING,
      key: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      countryId: DataTypes.INTEGER,
      stateCode: DataTypes.INTEGER,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'state',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  // eslint-disable-next-line no-unused-vars
  state.associate = function (models) {};
  return state;
};
