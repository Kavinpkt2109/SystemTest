'use strict';
import { Model, Sequelize } from "sequelize";
module.exports = (sequelize: any, DataTypes: { STRING: any; }) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  user.init({
    name: DataTypes.STRING,
    password:DataTypes.STRING,
    emailId:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};