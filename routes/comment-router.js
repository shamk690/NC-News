const commentRouter = require("express").Router();
const {
  patchCommentsById,
  deleteCommentById
} = require("../controllers/comment-controller.js");
const { methodNotAllowed } = require("../errors/index.js");

commentRouter
  .route("/:comment_id")
  .patch(patchCommentsById)
  .delete(deleteCommentById)
  .all(methodNotAllowed);

module.exports = commentRouter;
