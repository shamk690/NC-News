const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const articlesRouter = require("./articles-router");
const commentRouter = require("./comment-router");
const userRouter = require("./user-router");
const { endPointsDetails } = require("./routesOfApi");
const { methodNotAllowed } = require("../errors");

apiRouter
  .route("/")
  .get((req, res) => res.send({ endpoints: endPointsDetails() }))
  .get(endPointsDetails)
  .all(methodNotAllowed);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter).all(methodNotAllowed);

module.exports = apiRouter;
