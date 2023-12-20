/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.belongsTo(models.city, { foreignKey: 'cityId', onDelete: 'CASCADE' });
      users.belongsTo(models.state, { foreignKey: 'stateId', onDelete: 'CASCADE' });
      users.belongsTo(models.country, { foreignKey: 'countryId', onDelete: 'CASCADE' });
    }
  }

  users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      jobTitle: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      password: DataTypes.STRING,
      userName: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      stateId: DataTypes.INTEGER,
      countryId: DataTypes.INTEGER,
      bio: DataTypes.TEXT,
      companyName: DataTypes.STRING,
      userStatus: DataTypes.ENUM('Active', 'Inactive', 'Invited'),
      isTrash: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'users',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );

  users.associate = function (models) {};
  return users;
};
