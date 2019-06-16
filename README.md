Northcoders News API (Backend)
API is hosted on Heroku.

This repository is a backend for a full stack Northcoders News website which is build using Restful API. Database is built using PSQL database, and is being interacted using KNEX.JS. The end points of this API enable users to read and post articles. Users can also vote on a specific article or delete article if owned by the them. A user can also see current users and view articles based on specific author. Articles are based on different topics which can be added or viewed.
View API and route description is available at:

https://shamila-nc-news.herokuapp.com/api

Build using
• Node.JS
• Express
• Knex.js
• PostgreSQL
• Chai
• Mocha
• SuperTest

Getting Started

Setting up project locally and running tests
Fork and Clone the project to your local machine To clone add the following command in command line.
• git clone https://github.com/shamk690/NC-News.git
Installing dependencies
• $ npm install knex, pg, express
•	$ npm install mocha, chai, supertest -D
• npm run setup-dbs
• npm run seed

• In your projects root directory create the file named knexfile.js and paste the following code and save it.

const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;

const baseConfig = {
client: "pg",
migrations: {
directory: "./db/migrations"
},
seeds: {
directory: "./db/seeds"
}
};

const customConfigs = {
development: {
connection: {
database: "ncnews",
// username: "if using linux please un-comment and enter your username for PostgreSQL DB ",
// password: "if using linux please un-comment and enter your password for DB "
}
},
test: {
connection: {
database: "ncnews_test",
// username: " if using linux please un-comment and enter your username for PostgreSQL DB ",
// password: "if using linux please un-comment and enter your password for DB"
}
},
production: {
connection: `${DB_URL}?ssl=true`
}
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };

Note: Linux users must enter username and password in the knexfile.js file

Run project on local host or Running Tests

Start the project
• npm run start
The app is now running on http://localhost:9090

To run the tests type in
• npm t

Available endpoints

GET /api/topics

GET /api/users/:username

GET /api/articles/:article_id
PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api

POST /api/articles

DELETE /api/articles/:article_id

POST /api/topics

POST /api/users
GET /api/users

Responds with

All of the endpoints send the responses with in an object, with key name of what is being sent for example:

{
topics: [
{
slug: "coding",
description: "Code is love, code is life"
},
{
slug: "football",
description: "FOOTIE!"
},
{
slug: "cooking",
description: "Hey good looking, what you got cooking?"
},
{
slug: "Bike Riding",
description: "How Safe is Riding"
},
{
slug: "Hard Working",
description: "Hello There"
}
]
}

Author: Shamila Asif
