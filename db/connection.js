const dbConfig = require("../knexfile");

const dbConfig =
  ENV === "production"
    ? {
        client: "pg",
        connection: process.env.DATABASE_URL
      }
    : require("../knexfile");
module.exports = require("knex")(dbConfig);
