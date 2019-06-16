Northcoders News API (Backend)

This is backend of a full stack Northcoders News website Which is build using Restful API. Database is buit using PSQL, and is been interacted using Knex.

Getting Started
Setting up project locally
Clone the project to your local machine
In your projects root directory create the file named knexfile.js and paste the following code and save it.

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
username: "your username for PostgreSQL DB",
password: "your password DB "
}
},
test: {
connection: {
database: "ncnews_test",
username: " your username for PostgreSQL DB",
password: "you password for DB"
}
},
production: {
connection: `${DB_URL}?ssl=true`
}
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };

<!-- # ncnews

## Available Scripts

Create development and test databases locally:

```bash
npm run setup-dbs
```

Create a new migration file:

```bash
npm run migrate-make <filename>
```

Run all migrations:

```bash
npm run migrate-latest
```

Rollback all migrations:

```bash
npm run migrate-rollback
```

Run tests:

```bash
npm test
```

Rollback, migrate -> latest, then start inserting data into the database:

```bash
npm run seed
```

Run the server with `nodemon`, for hot reload:

```bash
npm run dev
```

Run the server with `node`:

```bash
npm start
``` -->
