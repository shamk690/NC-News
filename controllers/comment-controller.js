const {
  updateVotes,
  removeCommentById
} = require("../models/comments-model.js");

exports.patchCommentsById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  // if (typeof article_id === "string" && inc_votes === undefined) {
  //   return Promise.reject({
  //     status: 400,
  //     msg: "Missing inc_votes key in body"
  //   });
  // }
  updateVotes(comment_id, inc_votes)
    .then(comment => {
      // console.log("controler patchrrr", article);
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(result => {
      // console.log(result);
      if (result === 1) res.status(204).send({ result });
      else return Promise.reject({ status: 404, msg: "comment_id not found" });
    })
    .catch(next);
};
