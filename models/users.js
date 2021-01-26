'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notNull: true,
        isUUID: 4,
      },
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type : DataTypes.STRING(50),
      allowNull : false, 
    },
    email: {
      type : DataTypes.STRING(255),
      allowNull : false,
    },
    password: {
      type : DataTypes.STRING(255),
      allowNull : false,
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};