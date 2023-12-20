const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class passwordChangeRequests extends Model {}
  passwordChangeRequests.init(
    {
      userId: DataTypes.INTEGER,
      code: DataTypes.UUIDV4,
      tiggertime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'passwordChangeRequests',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  return passwordChangeRequests;
};
