**Summary**

Northcoders News API (Backend) API is hosted on Heroku.

This repository is a backend for a full stack Northcoders News website which is built using Restful API. Database is built using PSQL database and is being interacted using KNEX.JS. The end points of this API enable users to read and post articles. Users can also vote on a specific article or delete article if owned by the them. A user can also see current users and view articles based on specific author. Articles are based on different topics which can be added or viewed. View API and route description is available at:

[https://shamila-nc-news.herokuapp.com/api](https://shamila-nc-news.herokuapp.com/api)

Built using:

- JS
- Express
- js
- PostgreSQL
- Chai
- Mocha
- SuperTest

**Getting\*\*** Started\*\*

**Setting up project locally and running tests**

Fork and clone the project to your local machine. To clone use the following command in command line:

git clone [https://github.com/shamk690/NC-News.git](https://github.com/shamk690/NC-News.git)

Installing dependencies

- npm install knex, pg, express
- npm install mocha, chai, supertest -D
- npm run setup-dbs
- npm run seed

• In your projects root directory create the file named knexfile.js and paste the following code and save it.

```JS
const ENV = process.env.NODE_ENV || &quot;development&quot;;

const { DB_URL } = process.env;

const baseConfig = {

client: &quot;pg&quot;,

migrations: {

directory: &quot;./db/migrations&quot;

},

seeds: {

directory: &quot;./db/seeds&quot;

}

};

const customConfigs = {

development: {

connection: {

database: &quot;ncnews&quot;,

// username: &quot;if using linux please un-comment and enter your username for PostgreSQL DB &quot;,

// password: &quot;if using linux please un-comment and enter your password for DB &quot;

}

},

test: {

connection: {

database: &quot;ncnews_test&quot;,

// username: &quot; if using linux please un-comment and enter your username for PostgreSQL DB &quot;,

// password: &quot;if using linux please un-comment and enter your password for DB&quot;

}

},

production: {

connection: `${DB_URL}?ssl=true`

}

};

module.exports = { ...baseConfig, ...customConfigs[ENV] };

```

Note: Linux users must enter username and password in the knexfile.js file

**Run project on local host or Running Tests**

Start the project • npm run start.

The app is now running on [http://localhost:9090](http://localhost:9090/)

To run the tests type in:

npm t

**Available endpoints**

GET /api/topics

GET /api/users/:username

GET /api/articles/:article_id PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments GET /api/articles/:article_id/comments

GET /api/articles

PATCH /api/comments/:comment_id DELETE /api/comments/:comment_id

GET /api

POST /api/articles

DELETE /api/articles/:article_id

POST /api/topics

POST /api/users GET /api/users

**Responds with**

All of the endpoints send the responses with in an object, with key name of what is being sent for example:

{

topics: [

{

slug: &quot;coding&quot;,

description: &quot;Code is love, code is life&quot;

},

{

slug: &quot;football&quot;,

description: &quot;FOOTIE!&quot;

},

{

slug: &quot;cooking&quot;,

description: &quot;Hey good looking, what you got cooking?&quot;

},

{

slug: &quot;Bike Riding&quot;,

description: &quot;How Safe is Riding&quot;

},

{

slug: &quot;Hard Working&quot;,

description: &quot;Hello There&quot;

}

]

}

Author: Shamila Asif
