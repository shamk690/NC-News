exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", articleTable => {
    articleTable.increments("article_id").primary();
    articleTable.string("title").notNullable();
    articleTable.text("body").notNullable();
    articleTable
      .integer("votes")
      .notNullable()
      .defaultTo(0);
    articleTable.string("topic");
    articleTable.foreign("topic").references("topics.slug");

    articleTable.string("author");
    articleTable.foreign("author").references("users.username");
    articleTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("articles");
};
