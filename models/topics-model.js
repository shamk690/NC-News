const connection = require("../db/connection");

const selectAllTopics = function() {
  return connection.select("*").from("topics");
};

module.exports = selectAllTopics;
