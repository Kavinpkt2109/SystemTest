'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize: any, DataTypes: { STRING: any; }) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  chat.init({
    userName: DataTypes.STRING,
    message:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chat',
  });
  return chat;
};