const {
  selectUserByUsername,
  selectAllUsers,
  insertUser
} = require("../models/user-model.js");

exports.getUserByUserName = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username)
    .then(([user]) => {
      if (user === undefined) {
        return Promise.reject({
          status: 404,
          msg: "404: user Not Found"
        });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  selectAllUsers(req.query)
    .then(users => {
      if (!users.length)
        return Promise.reject({
          status: 404,
          msg: "The requested resource could not be found"
        });
      return res.status(200).send({ users: users });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  insertUser(req.body)
    .then(([user]) => {
      res.status(201).send({ user: user });
    })
    .catch(next);
};
