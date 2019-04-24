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
          console.log("****", res.body.articles);
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
});

// order, which can be set to asc or desc for ascending or descending (defaults to descending)
