'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', 
  {
    title:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Todo.associate = (models) => 
  {
    Todo.hasMany(models.TodoItem, 
      {
        as: 'todoItems',
        foreignKey: 'todoId'
      });
  };
  return Todo;
};