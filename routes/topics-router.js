const topicsRouter = require("express").Router();
const { getAllTopics } = require("../controllers/topics-controller");
const { methodNotAllowed } = require("../errors/index.js");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
