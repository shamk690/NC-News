const connection = require("../db/connection");

// const selectAllArticles = function() {
//   console.log("articles model");

//   return connection.select("*").from("articles");
// };
const selectAllArticles = function({ article_id }) {
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
      console.log(article_id, "******");
      if (article_id) query.where("articles.article_id", article_id).first();
    });
};
module.exports = selectAllArticles;

// articles array of article objects, each of which should have the following properties:
// author which is the username from the users table
// title
// article_id
// topic
// created_at
// votes
// comment_count
