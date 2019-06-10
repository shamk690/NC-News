const { selectAllTopics, insertTopic } = require("../models/topics-model");

exports.getAllTopics = (req, res, next) => {
  selectAllTopics()
    .then(topics => {
      return res.status(200).send({ topics: topics });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  insertTopic(req.body)
    .then(([topic]) => {
      res.status(201).send({ topic: topic });
    })
    .catch(next);
};
