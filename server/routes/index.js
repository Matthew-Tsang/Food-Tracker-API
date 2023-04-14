const todosController = require('../controller').todos;
const todosItemsController = require('../controller').todoItems;
const profileController = require('../controller').profiles;
const foodController = require('../controller').foodlists;
const foodItemController = require('../controller').foodItems;
const authController = require('../controller').users;

const cookieParser = require("cookie-parser");
const {validateToken} = require('../../JWT');

module.exports = (app) =>
{
    app.use(cookieParser());

    app.get('/api', (req, res) => res.status(200).send(
        {
            message: "this is the todo api",
        }
    ));

    app.post('/api/todos', todosController.create);
    app.get('/api/todos', todosController.list);
    app.post('/api/todos/:todoId/items', todosItemsController.create);
    app.get('/api/todos/:todoId', todosController.retrieve);
    app.delete('/api/todos/:todoId', todosController.destroy);
    app.put('/api/todos/:todoId/items/:todoItemId', todosItemsController.update);
    app.delete('/api/todos/:todoId/items/:todoItemId', todosItemsController.destroy);

    app.post('/api/profiles', validateToken, profileController.create);
    app.get('/api/profiles', validateToken, profileController.retrieve);
    app.put('/api/profiles', validateToken, profileController.update);
    
    app.post('/auth/login', authController.loginUser);
    app.post('/auth/register', authController.register);
    app.get('/auth/logout', validateToken, authController.logout);
    app.put('/auth/resetpw', validateToken, authController.resetPassword);
    app.put('/auth/resetemail', validateToken, authController.updateEmail);
    app.get('/auth/user', validateToken, authController.getUser);

    app.post('/api/foods', validateToken, foodController.create);
    app.get('/api/foods', validateToken, foodController.retrieve);
    app.post('/api/meals', validateToken, foodController.createPlan);
    app.get('/api/meals', validateToken, foodController.list);
    app.put('/api/meals', validateToken, foodController.update);
    app.delete('/api/meals', validateToken, foodController.destroy);
    app.get('/api/meals/:listId', validateToken, foodController.retrievePlan);

    /**
     * requests regarding food item requires the id of the list, not the user
     * updating/destroying specific list also requires id of the specific food item
     * body param for list id is listId, body param for food id is foodId
     */
    app.get('/api/foods/items/:foodId', validateToken, foodItemController.retrieve);
    app.post('/api/foods/items', validateToken, foodItemController.create);
    app.put('/api/foods/items', validateToken, foodItemController.update);
    app.delete('/api/foods/items', validateToken, foodItemController.destroy);

    /**
     * returns sorted list based on body params
     * sortby : (field to sort food items by)
     * asc : true means sort ascending, false means sort descending
     * asc should be a lower case string 'true' for true
     */
    app.post('/api/foods/sorted', validateToken, foodController.retrieveSorted)
    app.post('/api/meals/:listId/sorted', validateToken, foodController.retrieveSortedPlan)

    app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
        message: "Method not implemented",
    }));
};
