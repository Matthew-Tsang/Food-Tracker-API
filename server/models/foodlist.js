'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const FoodList = sequelize.define('FoodList',
  {
    title:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main:
    {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  FoodList.associate = (models) =>
  {
    FoodList.hasMany(models.FoodItem,
      {
        as: 'foodItems',
        foreignkey: 'FoodListId'
      });
    FoodList.belongsTo(models.Users,
      {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
  };
  return FoodList;
};