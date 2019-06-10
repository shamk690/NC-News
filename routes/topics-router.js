const topicsRouter = require("express").Router();
const { getAllTopics, postTopic } = require("../controllers/topics-controller");
const { methodNotAllowed } = require("../errors/index.js");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .post(postTopic)

  .all(methodNotAllowed);

module.exports = topicsRouter;
