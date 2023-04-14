# food-tracker-api
This is the backend API that handles database queries, as well as contains all the migrations, models, and schemas necessary for the PSQL relational database.  
Current features include a relational database that handles users, profile information, food lists and mealplans (differentiated by a boolean), and food items.  
All users are associated with one profile, one main food list, and many meal plans. All food items are associated with one food list or meal plan.  
Deleting a food list correspondingly deletes all contained food items. Food items are generated per list, so changing one food item will not affect other food items of the same type.  
## How to Run
Before running, make sure to put the correct information inside of /server/config/config.json. This will require your postgres username and password.  
Make sure to install all the packages noted in the package.json with npm install.  
Afterwards, migrate the database into your postgres database with the sequelize command: npx sequelize db:migrate  
If everything has been installed properly, the api should properly start with the comman: npm start  
## App structure
In the bin folder, there is an environmental file that can be configured to edit things like ports.  
In the config folder, there is a config file used to login to your postgres database(s).  
The controller folder contains the functions that handle database queries. The functions defined here are later called in routes for the API endpoints, and is where more queries should be defined.  
The migrations folder contains the migrations necessary to update the database schemas for those with new or outdated databases.  
The models folder contains the models of the tables themselves, and is necessary for defining what parts of each item are accessible.  
Any changes to the database schema should be handled in these folders, a new migration should be created for any new columns, and the model files should be updated appropriately.  
The routes folder contains index.js, which defines all of the API endpoints and routes. This is the file that should be modified if any endpoints and requests were to be modified.  
The .sequelizerc file handles how sequelize sees the app structure, modify as necessary.  
JWT.js handles the implementation of JSON webtokens as a form of account authentication. Any modifications to how JWTs work should be done in this file.  
## API endpoints
Currently there are endpoints that handle these current features:  
#### Authentication  
###### There are 6 endpoints related to authentication and user accounts.  
A post request to '/auth/register' to register a new account.  
A post request to '/auth/login' to login to an existing account.  
All other endpoints, even in other sections require a logged in user as their token will be validated.  
A get request to '/auth/logout' to remove the authentication token (which effectively logs the user out)  
2 post requests to '/auth/resetpw' or '/auth/resetemail' to update the corresponding field.  
A get request to '/auth/user' to return the corresponding User from the database.  
#### Profiles   
###### There are three endpoints to '/api/profiles'  
A post request creates a new profile for the logged in user.  
A get request retrieves the profile associated with the logged in user. If no profile is found, generates a default profile for that user.  
A put request that updates information regarding the profile of the logged in user in the database.  
#### Food List  
###### There are three endpoints related to the main food list.  
A post request to '/api/foods' creates the main food list.  
A get request to '/api/foods' retrieves the main food list.
A post request to '/api/foods/sorted' retrieves the main food list, but sorted by the body parameters sortby and asc. Sortby is a string of which category to sortby, asc is a string saying 'true' for ascending, 'false' for descending.  
#### Meal plans
###### There is one endpoint related to the list of meal plans.  
A get request to '/api/meals' retrieves the list of all meal plans for the logged in user.  
###### There are five endpoints relating to specific meal plans.  
A post request to '/api/meals' creates a new meal plan.  
A put request to '/api/meals' updates a specific meal plan's name.  
A delete request to '/api/meals' deletes the specified meal plan.  
A get request to '/api/meals/:listId' retrieves the meal plan specified by the listId in the url.  
A post request to '/api/meals/:listId/sorted' retrieves the meal plan specified by the listId in the url, but sorted by sortby and asc.  
#### Food Items  
###### There are four endpoints related to specific food items.  
A get request to '/api/foods/items/:foodId' retrives the specified food item.  
A post request to '/api/foods/items' creates a food item and associates it to a specified list.  
A put request to '/api/foods/items' updates a specific food items properties.  
A delete request to '/api/foods/items' deletes a specific food item.
#### Other
There are holdover legacy endpoints for todolists. **These are not neccessary for the food tracker app.**  
## Important packages
Nodemon allows you to edit the app without restarting it manually.  
Sequelize handles database requests and the syntax for them.  
Body-parser allows you to parse parameters in API requests.  
Cookie-parser allows you to properly use cookies, which is necessary for JWT.  
JWT is used to handle account authentication and authorization.  
## Known bugs  
-The current method of handling updating requests ignores empty fields. While this is good for not resetting things that are unspecified, it also prevents the user from setting any property in anything to specifically zero.  
-Currently passwords are stored in plaintext. Please change this before deploying this anywhere.  
-In the same vein, the JWT secret used for encryption is not very secret. Please change this before deploying this anywhere.  
## Possible future features  
-The integration of cloudinary to allow users to upload pictures for their profiles, as well as possibly food.  
-The ability to sort the mealplans in the list of mealplans, possibly by name, total calories, etc.  
-The ability to combine multiple food items into one mega food item that adds up their nutritional info.  
