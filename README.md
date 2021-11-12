# video-game-database

## User Story

User wants to create a database that can keep track of the games they have played, they are currently playing, and wish to play/buy.
User  will be given a search form where they can enter a game or series title and pull up a list of games related to that search
User can also search by category, platform, ESRB rating, etc. (Depending what the API gives us, but minimum we want it to include ).
Upon submitting, user will get a list of games where they can select whether they have played it, currently playing, or want to play it.
User can then access their databases to see what they have added.
User can make their profile public or private so others can compare games.
User databases are specfic to the login and can only be updated if you are logged in otherwise it it can only be viewed.

## General Info
The app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.[Link to deployed application](https://vast-lake-35863.herokuapp.com/)

Image showcasing the application 

![alt text]()
![alt text]()
![alt text]()

## Technologies
Project is created with 
* [Javascript](https://www.javascript.com/)
* [Node.js](https://nodejs.org/en/)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Express](https://www.npmjs.com/package/express)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
