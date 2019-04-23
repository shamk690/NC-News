const selectAllArticles = require("../models/articles-model");

exports.getAllArticles = (req, res, next) => {
  console.log("articles controllers");
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
      res.status(200).send({ article });
    })
    .catch(next);
};
