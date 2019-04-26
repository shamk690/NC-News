const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  patchVotes,
  getCommentsByArticleId,
  postCommentById
} = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors/index.js");

articlesRouter.route("/").get(getAllArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchVotes)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentById);
module.exports = articlesRouter;
