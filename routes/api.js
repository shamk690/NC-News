const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const articlesRouter = require("./articles-router");
//const commentRouter = require("./comment-router");
const { methodNotAllowed } = require("../errors");

apiRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
//apiRouter.use("/comments", commentRouter);

module.exports = apiRouter;
