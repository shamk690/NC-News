const userRouter = require("express").Router();
const { getUserByUserName } = require("../controllers/user-controller");
const { methodNotAllowed } = require("../errors/index.js");

userRouter
  .route("/:username")
  .get(getUserByUserName)
  .all(methodNotAllowed);
module.exports = userRouter;
