const { userData, topicData, articleData, commentsData } = require("../data");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("users")
        .insert(userData)
        .returning("*");
    })

    .then(() => {
      return knex("topics")
        .insert(topicData)
        .returning("*");
    })
    .then(() => {
      let formattedArray = articleData.map(item => {
        const date = new Date(item.created_at);

        const { created_at, ...newArticleData } = item;
        return { ...newArticleData, created_at: date };
      });
      return formattedArray;
    })
    .then(formattedArray => {
      return knex("articles")
        .insert(formattedArray)
        .returning("*");
    })
    .then(articleData => {
      const clone = articleData.map(element => {
        let obj = {
          article_id: element.article_id,
          title: element.title
        };

        return obj;
      });
      return clone;
    })
    .then(articleArr => {
      //console.log(articleArr);
      const newCommentData = commentsData.map(comment => {
        let obj = {};
        let belongTo = comment.belongs_to;

        articleArr.find(element => {
          if (element.title === belongTo) {
            let date = new Date(comment.created_at);

            obj = {
              author: comment.created_by,
              article_id: element.article_id,
              votes: comment.votes,
              created_at: date,
              body: comment.body
              // title: element.title,
              // belongs_to: belongTo
            };
            return obj;
          }
        });
        return obj;
      });
      return newCommentData;
    })
    .then(data => {
      //console.log(data);
      return knex("comments")
        .insert(data)
        .returning("*");
    });
};
