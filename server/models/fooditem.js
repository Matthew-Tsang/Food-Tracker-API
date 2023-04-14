'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.FoodList,
        {
          foreignKey: 'FoodListId',
          onDelete: 'CASCADE',
        });
    }
  }
  FoodItem.init({
    name: DataTypes.STRING,
    grams: DataTypes.DOUBLE,
    calories: DataTypes.DOUBLE,
    carbs: DataTypes.DOUBLE,
    protein: DataTypes.DOUBLE,
    fat: DataTypes.DOUBLE,
    fiber: DataTypes.DOUBLE,
    sodium: DataTypes.DOUBLE,
    cholesterol: DataTypes.DOUBLE,
    sugar: DataTypes.DOUBLE,
    cost: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'FoodItem',
  });
  return FoodItem;
};