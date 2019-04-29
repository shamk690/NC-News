const {
  selectAllArticles,
  updateVotes,
  selectCommentsByArticleId,
  insertCommentByArticleId
} = require("../models/articles-model");

exports.getAllArticles = (req, res, next) => {
  selectAllArticles(req.query)
    .then(articles => {
      if (!articles.length)
        return Promise.reject({
          status: 404,
          msg: "The requested resource could not be found"
        });
      return res.status(200).send({ articles: articles });
    })
    .catch(next);
};
exports.getArticleById = (req, res, next) => {
  selectAllArticles({ ...req.query, ...req.params })
    .then(article => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "404 Not Found"
        });
      }
      return res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateVotes(article_id, inc_votes)
    .then(([article]) => {
      if (!inc_votes) {
        return Promise.reject({
          status: 400,
          msg: "Missing inc_votes key in body"
        });
      }
      return res.status(200).send({ article });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  selectCommentsByArticleId({ ...req.params, ...req.query })
    .then(comments => {
      if (!comments.length) {
        return Promise.reject({
          status: 404,
          msg: "404 Not Found"
        });
      }
      res.status(200).send({ comments });
    })
    .catch(next);
};
exports.postCommentById = (req, res, next) => {
  const { article_id } = req.params;

  insertCommentByArticleId(article_id, req.body)
    .then(([comment]) => {
      // if (!comment[author])
      //   return Promise.reject({
      //     status: 400,
      //     msg: "Bad Request"
      //   });
      res.status(201).send({ comment });
    })
    .catch(next);
};
