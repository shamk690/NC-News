const selectAllTopics = require("../models/topics-model");

exports.getAllTopics = (req, res, next) => {
  selectAllTopics()
    .then(topics => {
      return res.status(200).send({ topics: topics });
    })
    .catch(next);
};
