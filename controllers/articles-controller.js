const {
  selectAllArticles,
  updateVotes,
  selectCommentsByArticleId,
  insertCommentByArticleId
} = require("../models/articles-model");

exports.getAllArticles = (req, res, next) => {
  //const { article_id } = req.pr;
  selectAllArticles(req.query)
    .then(articles => {
      return res.status(200).send({ articles: articles });
    })
    .catch(next);
};
exports.getArticleById = (req, res, next) => {
  selectAllArticles({ ...req.query, ...req.params })
    .then(article => {
      if (!article) {
        return Promise.reject({
          status: 400,
          msg: "Bad Request, incorrect article id"
        });
      }
      return res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  // if (typeof article_id === "string" && inc_votes === undefined) {
  //   return Promise.reject({
  //     status: 400,
  //     msg: "Missing inc_votes key in body"
  //   });
  // }
  updateVotes(article_id, inc_votes)
    .then(article => {
      // console.log("controler patchrrr", article);
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  selectCommentsByArticleId({ ...req.params, ...req.query })
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
exports.postCommentById = (req, res, next) => {
  const { article_id } = req.params;
  insertCommentByArticleId(article_id, req.body)
    .then(([comment]) => {
      return res.status(200).send({ comment });
    })
    .catch(next);
};
