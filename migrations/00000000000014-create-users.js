const config = require('../src/config/vars');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        jobTitle: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        mobile: {
          type: Sequelize.STRING,
          validate: {
            is: /^\d{10}$/,
          },
        },
        password: {
          type: Sequelize.STRING,
        },
        userName: {
          type: Sequelize.STRING,
        },
        cityId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'city',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        stateId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'state',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        countryId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'country',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        bio: {
          type: Sequelize.TEXT,
        },
        companyName: {
          type: Sequelize.STRING,
        },
        userStatus: {
          type: Sequelize.ENUM('Active', 'Inactive', 'Invited'),
        },
        isTrash: {
          type: Sequelize.BOOLEAN,
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
        freezeTableName: true,
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
