const connection = require("../db/connection");

const selectAllArticles = function({
  article_id,
  author,
  topic,
  sort_by,
  order
}) {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")

    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (article_id) query.where("articles.article_id", article_id).first();
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    });
};
const updateVotes = (article_id, inc_votes) => {
  return connection("articles")
    .where({ article_id })
    .increment("votes", inc_votes)

    .returning("*");
};
const selectCommentsByArticleId = ({ article_id, sort_by, order }) => {
  return connection
    .select(
      //"articles.article_id",
      "comments.comment_id",
      "comments.votes",
      "comments.created_at",
      "comments.author",
      "comments.body"
    )
    .from("articles")
    .innerJoin("comments", "articles.article_id", "comments.article_id")
    .where("comments.article_id", article_id)
    .orderBy(sort_by || "created_at", order || "desc");
};
const insertCommentByArticleId = (article_id, body) => {
  //if (body.author === undefined) body.author = "butter_bridge";
  if (body.author === undefined)
    return Promise.reject({
      status: 400,
      msg: "400: Bad Request"
    });
  const newComment = {
    article_id,
    author: body.author,
    body: body.body
  };
  return connection("comments")
    .insert(newComment)
    .returning("*");
};
module.exports = {
  selectAllArticles,
  updateVotes,
  selectCommentsByArticleId,
  insertCommentByArticleId
};
