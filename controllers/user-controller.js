const { selectUserByUsername } = require("../models/user-model.js");

exports.getUserByUserName = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};
