const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  patchVotes,
  getCommentsByArticleId,
  postCommentById,
  postArticle,
  deleteArticleById
} = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors/index.js");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .post(postArticle)

  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchVotes)
  .delete(deleteArticleById)

  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentById)
  .all(methodNotAllowed);

module.exports = articlesRouter;
