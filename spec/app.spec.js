process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);
const topics = require("../db/data/test-data/articles");
console.log(topics.length);
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
            //console.log(res.body);
          });
      });
      it("GET status:200 responds with an array of object checks each topic has right properties", () => {
        return request
          .get("/api/topics")
          .expect(200)

          .then(res => {
            expect(res.body.topics).to.be.an("array");
            expect(res.body.topics[0]).to.contain.keys("slug", "description");
            // console.log(res.body);
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
            //console.log(topics[0]);
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
            // console.log(res.body);
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
              title: "Moustache",
              article_id: 12,
              topic: "mitch",
              created_at: "1974-11-26T12:21:54.171Z",
              votes: 0,
              comment_count: "0"
            });
            //console.log(articles[0]);
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
            /// console.log(res.body.articles[0]);
          });
      });
      it("GET status:200 responds with specified article id object", () => {
        return request
          .get("/api/articles/1")
          .expect(200)

          .then(res => {
            // expect(res.body.article).to.be.an("array");
            expect(res.body.article).to.eql({
              article_id: 1,
              comment_count: "13",
              created_at: "2018-11-15T12:21:54.171Z",

              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              votes: 100
            });
            /// console.log(res.body.articles[0]);
          });
      });
    });
  });
});
