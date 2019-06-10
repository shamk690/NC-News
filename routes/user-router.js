const userRouter = require("express").Router();
const {
  getUserByUserName,
  getAllUsers,
  postUser
} = require("../controllers/user-controller");
const { methodNotAllowed } = require("../errors/index.js");

userRouter
  .route("/")
  .get(getAllUsers)
  .post(postUser)

  .all(methodNotAllowed);

userRouter
  .route("/:username")
  .get(getUserByUserName)
  .all(methodNotAllowed);
module.exports = userRouter;
