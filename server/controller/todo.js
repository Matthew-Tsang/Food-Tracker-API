const TodoItem = require('../models').TodoItem;
const Todo = require('../models').Todo;

module.exports =
{
    create(req, res)
    {
        return Todo
            .create
            ({
                title: req.body.title,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },
    list(req, res)
    {
        return Todo
            .findAll(
                {
                    include:[{
                        model: TodoItem,
                        as: 'todoItems',
                    }]
                }
            )
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res)
    {
        return Todo
            .findByPk(req.params.todoId, 
            {
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }],
            })
            .then(todo => 
                {
                    if (!todo)
                    {
                        return res.status(404).send(
                            {
                                message: 'List not found',
                            }
                        );
                    }
                    return res.status(200).send(todo);
                })
                .catch(error => res.status(400).send(error));
    },
    destroy(req, res)
    {
        return Todo
            .findByPk(req.params.todoId)
            .then(todo =>
                {
                    if(!todo)
                    {
                        return res.status(400).send(
                            {
                                message: "List not found",
                            }
                        );
                    }
                    return todo
                        .destroy()
                        .then(() => res.status(200).send(
                            {
                                message: "List deleted successfully"
                            }
                        ))
                        .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    },
};