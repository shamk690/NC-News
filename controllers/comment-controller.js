const { updateVotes } = require("../models/comments-model.js");

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
