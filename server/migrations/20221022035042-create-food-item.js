'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FoodItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      grams: {
        type: Sequelize.DOUBLE
      },
      calories: {
        type: Sequelize.DOUBLE
      },
      carbs: {
        type: Sequelize.DOUBLE
      },
      protein: {
        type: Sequelize.DOUBLE
      },
      fat: {
        type: Sequelize.DOUBLE
      },
      fiber: {
        type: Sequelize.DOUBLE
      },
      sodium: {
        type: Sequelize.DOUBLE
      },
      cholesterol: {
        type: Sequelize.DOUBLE
      },
      sugar: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      FoodListId:
      {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:
        {
          model: 'FoodLists',
          key: 'id',
          as: 'FoodListId',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FoodItems');
  }
};