const connection = require("../db/connection");

const updateVotes = (comment_id, inc_votes) => {
  console.log(comment_id);
  return connection("comments")
    .where({ comment_id })
    .increment("votes", inc_votes)

    .returning("*");
};

module.exports = { updateVotes };
