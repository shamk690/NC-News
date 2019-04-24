const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById
} = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors/index.js");

articlesRouter.route("/").get(getAllArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .all(methodNotAllowed);
module.exports = articlesRouter;
