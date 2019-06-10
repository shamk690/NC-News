const connection = require("../db/connection");

const selectAllTopics = function() {
  return connection.select("*").from("topics");
};

const insertTopic = body => {
  const newTopic = {
    slug: body.slug,
    description: body.description
  };
  return connection("topics")
    .insert(newTopic)
    .returning("*");
};

module.exports = { selectAllTopics, insertTopic };
