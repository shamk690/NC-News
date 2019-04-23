const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById
} = require("../controllers/articles-controller");
articlesRouter.route("/").get(getAllArticles);
articlesRouter.route("/:article_id").get(getArticleById);
console.log("articles router");
module.exports = articlesRouter;
