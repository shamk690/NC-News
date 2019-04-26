process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);

describe("/", () => {
  //runs the seed before every test
  beforeEach(() => connection.seed.run());

  after(() => connection.destroy());

  describe("/api", () => {
    describe("/topics:GET: GET", () => {
      it("GET status:200 responds with an array of all the topics object", () => {
        return request
          .get("/api/topics")
          .expect(200)

          .then(res => {
            expect(res.body.topics).to.be.an("array");
          });
      });
      it("GET status:200 responds with an array of object checks each topic has right properties", () => {
        return request
          .get("/api/topics")
          .expect(200)

          .then(res => {
            expect(res.body.topics).to.be.an("array");
            expect(res.body.topics[0]).to.contain.keys("slug", "description");
          });
      });

      it("GET status:200 returns the length of the rows in database to be 3 and checks for first row", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(topics).have.length(3);
            expect(topics[0]).to.eql({
              slug: "mitch",
              description: "The man, the Mitch, the legend"
            });
          });
      });
    });
    describe("/articles:GET", () => {
      it("GET status:200 responds with an array of all the articles object", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an("array");
          });
      });

      it("GET status:200 returns the length of the rows in database to be 12 and checks for first row", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).have.length(12);
            expect(articles[0]).to.eql({
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              article_id: 1,
              topic: "mitch",
              created_at: "2018-11-15T12:21:54.171Z",
              votes: 100,
              comment_count: "13"
            });
          });
      });

      it("GET status:200 responds with an array of object checks each article has right properties with comment count", () => {
        return request
          .get("/api/articles")
          .expect(200)

          .then(res => {
            expect(res.body.articles).to.be.an("array");
            expect(res.body.articles[0]).to.contain.keys(
              "article_id",
              "title",
              "comment_count",
              "votes",
              "topic",
              "author",
              "created_at"
            );
            //console.log(res.body.articles[0]);
          });
      });
      it("GET status:200 responds with specified article id object", () => {
        return request
          .get("/api/articles/1")
          .expect(200)

          .then(res => {
            expect(res.body.article).to.eql({
              article_id: 1,
              comment_count: "13",
              created_at: "2018-11-15T12:21:54.171Z",

              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              votes: 100
            });
          });
      });
      // error handling for bad request
      it("GET status:400 responses with error when request is made with a bad ID", () => {
        return request
          .get("/api/articles/xyzz")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.eql(
              "Bad Request, invalid input syntax for integer"
            );
          });
      });
      it("GET status:200 response with an array of comments for the given articles_id", () => {
        return request
          .get("/api/articles/1/comments")
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.an("array");
            expect(res.body.comments[0]).to.contain.keys(
              "comment_id",
              "votes",
              "created_at",
              "author",
              "body"
            );
            //console.log("****", res.body.comments[0]);
          });
      });
      it("GET status: 200 sorts the articles to date by default", () => {
        return request
          .get("/api/articles/1/comments")
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.descendingBy("created_at");
          });
      });
      it("articles can be sorted by comment_id specified as url sort_by query", () => {
        return request
          .get("/api/articles/1/comments?sort_by=comment_id")
          .expect(200)
          .then(res => {
            // console.log(res.body);
            expect(res.body.comments).to.be.descendingBy("comment_id");
            //expect(res.body.articles).to.be.sortedBy("title");
            //expect(res.body.articles).to.be.sortedBy("topic");
          });
      });
      it("articles can be sorted by votes specified as url sort_by query", () => {
        return request
          .get("/api/articles/1/comments?sort_by=votes")
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.descendingBy("votes");
          });
      });
      it("articles can be sorted by author specified as url sort_by query", () => {
        return request
          .get("/api/articles/1/comments?sort_by=author")
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.descendingBy("author");
          });
      });
      // it("articles can be sorted by body specified as url sort_by query", () => {
      //   return request
      //     .get("/api/articles/1/comments?sort_by=body")
      //     .expect(200)
      //     .then(res => {
      //       expect(res.body.comments).to.be.descendingBy("body");
      //     });
      // });
      it("articles can be sorted by column specified as url sort_by query", () => {
        return request
          .get("/api/articles/1/comments?sort_by=votes&order=asc")
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.ascendingBy("votes");
          });
      });

      it("GET status:200 responds with filtered article by username value specified in the query", () => {
        return request
          .get("/api/articles?author=butter_bridge")
          .expect(200)

          .then(res => {
            expect(res.body.articles[0].author).to.eql("butter_bridge");
          });
      });
      it("GET status:200 responds with filtered article by topic value specified in the query", () => {
        return request
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(res => {
            expect(res.body.articles[0].topic).to.eql("mitch");
          });
      });

      it("GET status: 200 sorts the articles to date by default", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.descendingBy("created_at");
          });
      });
      it("articles can be sorted by column specified as url sort_by query", () => {
        return request
          .get("/api/articles?sort_by=article_id")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.descendingBy("article_id");
            //expect(res.body.articles).to.be.sortedBy("title");
            //expect(res.body.articles).to.be.sortedBy("topic");
          });
      });
      it("articles can be sorted by column specified as url sort_by query", () => {
        return request
          .get("/api/articles?sort_by=title")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.descendingBy("title");
          });
      });
      it("articles can be sorted by column specified as url sort_by query", () => {
        return request
          .get("/api/articles?sort_by=topic")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.descendingBy("topic");
          });
      });
      it("articles can be sorted by column specified as url sort_by query", () => {
        return request
          .get("/api/articles?sort_by=votes")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.descendingBy("votes");
          });
      });
      it("articles can be sorted by column specified as url sort_by query", () => {
        return request
          .get("/api/articles?sort_by=votes&order=asc")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.ascendingBy("votes");
          });
      });
    });
    describe("/articles/PATCH ", () => {
      it("updates the articles by incrementing the vote by one with", () => {
        return request
          .patch("/api/articles/5")
          .send({ inc_votes: 3 })
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0].votes).to.equal(3);
            expect(body.article[0].article_id).to.equal(5);
            expect(body.article[0].title).to.equal(
              "UNCOVERED: catspiracy to bring down democracy"
            );
            expect(body.article[0].topic).to.equal("cats");
            expect(body.article[0].author).to.equal("rogersop");
            expect(body.article[0].created_at).to.eql(
              "2002-11-19T12:21:54.171Z"
            );
          });
      });
      it("updates the articles by decrementing the vote by one ", () => {
        return request
          .patch("/api/articles/5")
          .send({ dec_votes: -2 })
          .expect(200)
          .then(({ body }) => {
            //  console.log(body);
            expect(body.article[0].votes).to.equal(1);
            expect(body.article[0].article_id).to.equal(5);
            expect(body.article[0].title).to.equal(
              "UNCOVERED: catspiracy to bring down democracy"
            );
            expect(body.article[0].topic).to.equal("cats");
            expect(body.article[0].author).to.equal("rogersop");
            expect(body.article[0].created_at).to.eql(
              "2002-11-19T12:21:54.171Z"
            );
          });
      });
      // it("PATCH - status:400 responses with error when request is made with a bad ID", () => {
      //   return request
      //     .patch("/api/articles/xyzz")
      //     .send({inc_votes: 1})
      //     .expect(400)
      //     .then(res => {
      //       expect(res.body.msg).to.eql(
      //         "Bad Request, invalid input syntax for integer"
      //       );
      //     });
      // });
      // it("PATCH - status:400 responses missing votes key in body", () => {
      //   return request
      //     .patch("/api/articles/4")
      //     .send({ banana: 2 })
      //     .expect(400)
      //     .then(({ body }) => {
      //       expect(body.msg).to.eql("Missing inc_votes key in body");
      //     });
      // });
    });
    describe("POST/api/articles/:article_id/comments", () => {
      it("POSTS and responses with new comment with username for the given article_id", () => {
        return request
          .post("/api/articles/2/comments")
          .send({
            author: "rogersop",
            body: "sending new comment for id 2"
          })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment.author).to.eql("rogersop");
            expect(body.comment.body).to.eql("sending new comment for id 2");
          });
      });
    });
    describe("/comments/PATCH ", () => {
      it("updates the comments by incrementing the vote by one with", () => {
        return request
          .patch("/api/comments/3")
          .send({ inc_votes: 2 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0].votes).to.equal(102);
            expect(body.comment[0].author).to.equal("icellusedkars");

            expect(body.comment[0].created_at).to.eql(
              "2015-11-23T12:36:03.389Z"
            );
            expect(body.comment[0].body).to.equal(
              "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works."
            );
          });
      });
      it("updates the comment count by decrementing the vote by one", () => {
        return request
          .patch("/api/comments/3")
          .send({ dec_voteses: -1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0].votes).to.equal(101);
            expect(body.comment[0].author).to.equal("icellusedkars");

            expect(body.comment[0].created_at).to.eql(
              "2015-11-23T12:36:03.389Z"
            );
            expect(body.comment[0].body).to.equal(
              "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works."
            );
          });
      });
    });
    describe("/comments/DELETE ", () => {
      it("DELETE -status:204 deletes the comment by given id", () => {
        return request.delete("/api/comments/3").expect(204);
      });
      it("DELETE - status:404 for comment id that does not exists", () => {
        return request
          .delete("/api/comments/1234")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("comment_id not found");
          });
      });
    });
    describe("/api/users:username", () => {
      it("GET status:200 responds with specified username", () => {
        return request
          .get("/api/users/lurker")
          .expect(200)

          .then(res => {
            expect(res.body.user[0].username).to.eql("lurker");
            expect(res.body.user[0].name).to.eql("do_nothing");
            expect(res.body.user[0].avatar_url).to.eql(
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
            );
          });
      });
    });
  });
});
