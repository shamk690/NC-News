const connection = require("../db/connection");

// const selectAllArticles = function() {
//   console.log("articles model");

//   return connection.select("*").from("articles");
// };
const selectAllArticles = function({ article_id, author, topic }) {
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
    .modify(query => {
      if (article_id) query.where("articles.article_id", article_id).first();
      if (author) return query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    });
};
module.exports = selectAllArticles;
