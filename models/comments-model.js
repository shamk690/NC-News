const connection = require("../db/connection");

const updateVotes = (comment_id, inc_votes) => {
  return connection("comments")
    .where({ comment_id })
    .increment("votes", inc_votes || 0)

    .returning("*");
};

const removeCommentById = comment_id => {
  return connection("comments")
    .where({ comment_id })
    .delete();
};

module.exports = { updateVotes, removeCommentById };
