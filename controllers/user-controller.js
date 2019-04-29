const { selectUserByUsername } = require("../models/user-model.js");

exports.getUserByUserName = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username)
    .then(([user]) => {
      if (user === undefined) {
        return Promise.reject({
          status: 404,
          msg: "404 Not Found"
        });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};
