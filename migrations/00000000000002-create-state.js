const config = require('../src/config/vars');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'state',
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
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        countryId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'country',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        stateCode: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        latitude: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        longitude: {
          type: Sequelize.STRING,
          allowNull: true,
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
    await queryInterface.dropTable('state');
  },
};
