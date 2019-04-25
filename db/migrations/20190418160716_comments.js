exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", commentTable => {
    commentTable.increments("comment_id").primary();
    commentTable.string("author");
    commentTable.foreign("author").references("users.username");
    commentTable.integer("article_id").notNullable();
    commentTable.foreign("article_id").references("articles.article_id");
    commentTable
      .integer("votes")
      .notNullable()
      .defaultTo(0);

    commentTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentTable.text("body").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
