const config = require('../src/config/vars');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'country',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        key: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        countryCode: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        latitude: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        longitude: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
      },
      {
        schema: config.db.schema,
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('country');
  },
};
