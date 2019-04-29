const {
  updateVotes,
  removeCommentById
} = require("../models/comments-model.js");

exports.patchCommentsById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  updateVotes(comment_id, inc_votes)
    .then(([comment]) => {
      if (comment === undefined) {
        return Promise.reject({
          status: 404,
          msg: "404: Not Found"
        });
      }

      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(result => {
      if (result === 1) res.status(204).send({ result });
      else return Promise.reject({ status: 404, msg: "comment_id not found" });
    })
    .catch(next);
};
