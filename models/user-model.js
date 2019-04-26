const connection = require("../db/connection");

const selectUserByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username })
    .returning("*");
};

module.exports = {
  selectUserByUsername
};
