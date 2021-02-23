'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Lists, {
        foreignKey: 'listId',
      });
    }
  }
  Tasks.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Lists',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Tasks',
    },
  );
  return Tasks;
};
