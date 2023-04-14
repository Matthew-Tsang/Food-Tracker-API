const { Sequelize } = require('../models');
const { destroy } = require('./fooditem');

const FoodItem = require('../models').FoodItem;
const FoodList = require('../models').FoodList;

module.exports =
{
    create(req, res)
    {
        return FoodList
            .create({
                title: req.body.title,
                userId: req.user.id,
                main: true,
            })
            .then(foodlist => res.status(201).send(foodlist))
            .catch(error => res.status(400).send(error));
    },
    createPlan(req, res)
    {
        return FoodList
            .create({
                title: req.body.title,
                userId: req.user.id,
                main: false,
            })
            .then(foodlist => res.status(201).send(foodlist))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res)
    {
        return FoodList
            .findOne(
                {
                    where:
                    {
                        userId: req.user.id,
                        main: true,
                    },
                    include: [{
                        model: FoodItem,
                        as: 'foodItems',
                    }],
                }
            )
            .then(foodlist =>
                {
                    if(!foodlist)
                    {
                        return FoodList
                            .create({
                                title: "food list",
                                userId: req.user.id,
                                main: true,
                            })
                            .then(foodlist => res.status(201).send(foodlist))
                            .catch(error => res.status(400).send(error));
                    }
                    return res.status(200).send(foodlist);
                })
                .catch(error => res.status(400).send(error));
    },
    retrievePlan(req, res)
    {
        return FoodList
            .findOne(
                {
                    where:
                    {
                        id: req.params.listId,
                        userId: req.user.id,
                        main: false,
                    },
                    include: [{
                        model: FoodItem,
                        as: 'foodItems',
                    }],
                }
            )
            .then(foodlist =>
                {
                    if(!foodlist)
                    {
                        return res.status(400).send(
                            {
                                message: "List not found",
                            }
                        );
                    }
                    return res.status(200).send(foodlist);
                })
                .catch(error => res.status(400).send(error));
    },
    list(req, res)
    {
        return FoodList
            .findAll(
                {
                    where:
                    {
                        userId: req.user.id,
                        main: false,
                    },
                    include: [{
                        model: FoodItem,
                        as: 'foodItems',
                    }],
                }
            )
            .then(foodlists => res.status(200).send(foodlists))
            .catch(error => res.status(400).send(error));
    },
    update(req, res)
    {
        return FoodList
            .findOne(
                {
                    where:
                    {
                        userId: req.user.id,
                        id: req.body.listId,
                    }
                }
            )
            .then(foodlist => 
                {
                    if(!foodlist)
                    {
                        return res.status(400).send(
                            {
                                message: "List not found",
                            }
                        );
                    }
                    return foodlist
                        .update(
                            {
                                title: req.body.title || foodlist.title,
                            }
                        )
                        .then(updatedFoodlist => res.status(200).send(updatedFoodlist))
                })
                .catch(error => res.status(400).send(error));
    },
    /**
     * returns sorted list based on body params
     * sortby : (field to sort food items by)
     * asc : true means sort ascending, false means sort descending
     * asc should be a lower case string 'true' for true
     */
    retrieveSorted(req, res)
    {
        return FoodList
            .findOne(
                {
                    where:
                    {
                        userId: req.user.id,
                        main: true,
                    },
                    include: [{
                        model: FoodItem,
                        as: 'foodItems',
                    }],
                    order: [
                        [{model: FoodItem, as: 'foodItems'}, req.body.sortby, ((req.body.asc === 'true') ? 'asc' : 'desc')]
                    ],
                }
            )
            .then(foodlist =>
            {
                if(!foodlist)
                {
                    return FoodList
                        .create({
                            title: "food list",
                            userId: req.user.id,
                        })
                        .then(foodlist => res.status(201).send(foodlist))
                        .catch(error => res.status(400).send(error));
                }
                return res.status(200).send(foodlist);
            })
            .catch(error => res.status(400).send(error));
    },
    retrieveSortedPlan(req, res)
    {
        return FoodList
            .findOne(
                {
                    where:
                    {
                        id: req.params.listId,
                        userId: req.user.id,
                        main: false,
                    },
                    include: [{
                        model: FoodItem,
                        as: 'foodItems',
                    }],
                    order: [
                        [{model: FoodItem, as: 'foodItems'}, req.body.sortby, ((req.body.asc === 'true') ? 'asc' : 'desc')]
                    ],
                }
            )
            .then(foodlist =>
            {
                if(!foodlist)
                {
                    return FoodList
                        .create({
                            title: "food list",
                            userId: req.user.id,
                        })
                        .then(foodlist => res.status(201).send(foodlist))
                        .catch(error => res.status(400).send(error));
                }
                return res.status(200).send(foodlist);
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res)
    {
        return FoodList
            .findOne(
                {
                    where:
                    {
                        userId: req.user.id,
                        id: req.body.listId,
                    }
                }
            )
            .then(foodlist =>
                {
                    if(!foodlist)
                    {
                        return res.status(404).send(
                            {
                                message: "Meal plan not found"
                            }
                        );
                    }
                    return foodlist
                        .destroy()
                        .then(()=> res.status(200).send(
                            {
                                message: "Meal plan deleted successfully"
                            }
                        ))
                })
                .catch(error => res.status(400).send(error));
    }
};