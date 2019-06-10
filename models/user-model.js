const connection = require("../db/connection");

const selectUserByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username })
    .returning("*");
};

const selectAllUsers = function() {
  return connection.select("*").from("users");
};

const insertUser = body => {
  const newUser = {
    username: body.username,
    avatar_url: body.avatar_url,
    name: body.name
  };
  return connection("users")
    .insert(newUser)
    .returning("*");
};

module.exports = {
  selectUserByUsername,
  selectAllUsers,
  insertUser
};

// selectAllUsers,
// insertUser
