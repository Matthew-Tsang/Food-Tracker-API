const FoodItem = require('../models').FoodItem;

/**
 * requests regarding food item requires the id of the list, not the user
 * updating/destroying specific list also requires id of the specific food item
 * body param for list id is listId, body param for food id is foodId
 */
module.exports =
{
    create(req, res)
    {
        return FoodItem
            .create(
                {
                    name: req.body.name,
                    grams: parseFloat(req.body.grams),
                    calories: parseFloat(req.body.calories),
                    carbs: parseFloat(req.body.carbs),
                    protein: parseFloat(req.body.protein),
                    fat: parseFloat(req.body.fat),
                    fiber: parseFloat(req.body.fiber),
                    sodium: parseFloat(req.body.sodium),
                    cholesterol: parseFloat(req.body.cholesterol),
                    sugar: parseFloat(req.body.sugar),
                    cost: parseFloat(req.body.cost),
                    FoodListId: req.body.listId,
                }
            )
            .then(foodItem => res.status(201).send(foodItem))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res)
    {
        return FoodItem
            .findOne(
                {
                    where:
                    {
                        id: req.params.foodId,
                    },
                }
            )
            .then(foodItem =>
                {
                    if(!foodItem)
                    {
                        return res.status(404).send(
                            {
                                message: "Food item not found"
                            }
                        );
                    }
                    return res.status(200).send(foodItem);
                })
                .catch(error => res.status(400).send(error));
    },
    update(req, res)
    {
        return FoodItem
            .findOne(
                {
                    where:
                    {
                        id: req.body.foodId,
                        FoodListId: req.body.listId,
                    },
                }
            )
            .then(foodItem =>
                {
                    if(!foodItem)
                    {
                        return res.status(404).send(
                            {
                                message: "Food item not found"
                            }
                        );
                    }
                    return foodItem
                        .update(
                            {
                                name: req.body.name || foodItem.name,
                                grams: parseFloat(req.body.grams) || foodItem.grams,
                                calories: parseFloat(req.body.calories) || foodItem.calories,
                                carbs: parseFloat(req.body.carbs) || foodItem.carbs,
                                protein: parseFloat(req.body.protein) || foodItem.protein,
                                fat: parseFloat(req.body.fat) || foodItem.fat,
                                fiber: parseFloat(req.body.fiber) || foodItem.fiber,
                                sodium: parseFloat(req.body.sodium) || foodItem.sodium,
                                cholesterol: parseFloat(req.body.cholesterol) || foodItem.cholesterol,
                                sugar: parseFloat(req.body.sugar) || foodItem.sugar,
                                cost: parseFloat(req.body.cost) || foodItem.cost,
                            }
                        )
                        .then(updatedFoodItem => res.status(200).send(updatedFoodItem))
                        //.catch(error = res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    },
    destroy(req, res)
    {
        return FoodItem
            .findOne(
                {
                    where:
                    {
                        id: req.body.foodId,
                    }
                }
            )
            .then(foodItem => 
                {
                    if(!foodItem)
                    {
                        return res.status(404).send(
                            {
                                message: "Food item not found"
                            }
                        );
                    }
                    return foodItem
                        .destroy()
                        .then(() => res.status(200).send(
                            {
                                message: "Food deleted successfully"
                            }
                        ))
                        //.catch(error = res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    }
}