const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class refreshToken extends Model {}
  refreshToken.init(
    {
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'refreshToken',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  return refreshToken;
};
