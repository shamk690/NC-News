const { selectAllArticles, updateVotes } = require("../models/articles-model");

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
  updateVotes(article_id, inc_votes)
    .then(article => {
      // console.log("controler patchrrr", article);
      res.status(200).send({ article });
    })
    .catch(next);
};
