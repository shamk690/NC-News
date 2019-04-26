const commentRouter = require("express").Router();
const { patchCommentsById } = require("../controllers/comment-controller.js");
const { methodNotAllowed } = require("../errors/index.js");

commentRouter
  .route("/:comment_id")
  .patch(patchCommentsById)
  .all(methodNotAllowed);

module.exports = commentRouter;
