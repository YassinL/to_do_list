'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull : false,
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull : false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull : false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull : false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};