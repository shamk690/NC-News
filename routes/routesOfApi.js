const endPointsDetails = () => {
  const routes = {
    "GET/api": {
      description: "servers all available endpoints in json format"
    },
    "get/api/topics": {
      description: "servers array of topics",
      queryies: [],
      exampleResponse: {
        topics: [
          {
            slug: "coding",
            description: "Code is love, code is life"
          },
          {
            slug: "football",
            description: "FOOTIE!"
          },
          {
            slug: "cooking",
            description: "Hey good looking, what you got cooking?"
          }
        ]
      }
    },
    "get/api/articles": {
      description:
        "serves an array of all articles by default limit to 10, default sorted by date descending order",
      queries: ["sort_by", "order", "author", "topic", "limit", "p"],
      exampleResponse: {
        articles: [
          {
            author: "weegembump",
            title: "Seafood substitutions are increasing",
            article_id: 33,
            topic: "cooking",
            created_at: "2018-05-30T15:59:13.341Z",
            votes: 0,
            body:
              "'EAFOOD fraud is a serious global problem', begins a recent report from Oceana, an NGO. Reviewing over 200 studies in 55 countries, the report finds that one in five fish sold has been mislabelled...",
            comment_count: "6"
          }
        ]
      }
    },
    "get/api/articles/:artcle_id": {
      description: "responses with a single article object",
      queryes: [],
      exampleResponse: {
        article: {
          author: "jessjelly",
          title: "Running a Node App",
          article_id: 1,
          topic: "coding",
          created_at: "2016-08-18T12:07:52.389Z",
          votes: 0,
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          comment_count: "8"
        }
      }
    },
    "    PATCH /api/articles/:article_id": {
      description: "increment OR derement the votes for given articles_id",
      RequestBodyAccepts:
        "an object in the form { inc_votes: newVote } newVote will indicate how much the votes property in the database should be updated by",
      exampleResponse: {
        article: {
          author: "jessjelly",
          title: "Running a Node App",
          article_id: 1,
          topic: "coding",
          created_at: "2016-08-18T12:07:52.389Z",
          votes: 0,
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          comment_count: "8"
        }
      }
    },
    "GET/api/articles/:article_id/comments": {
      description:
        "Respone with an array of comments for the given article_id default sorted by date (created_at) which is default is descending",
      queries: ["sort_by", "order"],
      exampleResponse: {
        comments: [
          {
            comment_id: 44,
            votes: 4,
            created_at: "2017-11-20T08:58:48.322Z",
            author: "grumpy19",
            body:
              "Error est qui id corrupti et quod enim accusantium minus. Deleniti quae ea magni officiis et qui suscipit non."
          }
        ]
      }
    },
    "POST/api/articles/:article_id/comments": {
      description:
        "posts a new comment on the specified article_id and response with newly posted comment.",
      requesBody: { username: "username", body: "new comment" },
      exampleResponse: {
        comment_id: 52,
        votes: 10,
        created_at: "2017-07-31T08:14:13.076Z",
        author: "jessjelly",
        body:
          "Consectetur deleniti sed. Omnis et dolore omnis aspernatur. Et porro accusantium. Tempora ullam voluptatum et rerum."
      }
    },
    "PATCH/api/comments/:comment_id": {
      description: "increments or decrements the votes on the provided comment",
      requestBody:
        "{inc_votes: newVote}newVote will indicate how much the votes property in the database should be updated by",
      exampleResponse: {
        comment: {
          comment_id: 44,
          votes: 4,
          created_at: "2017-11-20T08:58:48.322Z",
          author: "grumpy19",
          body:
            "Error est qui id corrupti et quod enim accusantium minus. Deleniti quae ea magni officiis et qui suscipit non."
        }
      }
    },
    " DELETE /api/comments/:comment_id": {
      description: "Deletes the comment by coment_id",
      exampleResponse: { status: 204 }
    },
    "GET/api/users/:username": {
      description: "response with a user object for the given username",
      queries: [],
      exampleResponse: {
        user: {
          username: "weegembump",
          avatar_url:
            "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
          name: "Gemma Bump"
        }
      },
      "POST /api/articles": {
        description:
          "posts a new articles on the specified topic and response with newly posted articles",
        exampleResponse: {
          article_id: 64,
          author: "weegembump",
          body: "new article",
          created_at: "2019-06-16T01:01:28.622Z",
          title: "test",
          topic: "coding",
          votes: 0
        }
      },

      "DELETE /api/articles/:article_id": {
        description: "Deletes the article by article_id",
        exampleResponse: { status: 204 }
      },
      "POST /api/topics": {
        description: "post new topic and response with the posted topic",
        exampleResponse: { slug: "Hard Working", description: "Hello There" }
      },
      "POST /api/users": {
        description: "Post new user and respone with the posted user",
        exampleResponse: {
          username: "epiz",
          avatar_url:
            "https://gravatar.com/avatar/f4a367f63ea6b5ea13b3d0de1aa2b7c7?s=400&d=robohash&r=x",
          name: "Googli"
        }
      },
      "GET /api/users": {
        description: "Response with all the users in the database",
        exampleResponse: {
          0: {
            username: "tickle122",
            avatar_url:
              "https://gravatar.com/avatar/15b8d2e19ee0e01935dbcdc6b79ac4a1?s=400&d=robohash&r=x",
            name: "Tom Tickle"
          },
          1: {
            username: "grumpy19",
            avatar_url:
              "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
            name: "Paul Grump"
          },
          2: {
            username: "happyamy2016",
            avatar_url:
              "https://vignette1.wikia.nocookie.net/mrmen/images/…7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
            name: "Amy Happy"
          },
          3: {
            username: "cooljmessy",
            avatar_url:
              "https://vignette1.wikia.nocookie.net/mrmen/images/…7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
            name: "Peter Messy"
          },
          4: {
            username: "weegembump",
            avatar_url:
              "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
            name: "Gemma Bump"
          },
          5: {
            username: "jessjelly",
            avatar_url:
              "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
            name: "Jess Jelly"
          },
          6: {
            username: "epiz",
            avatar_url:
              "https://gravatar.com/avatar/f4a367f63ea6b5ea13b3d0de1aa2b7c7?s=400&d=robohash&r=x",
            name: "Googli"
          }
        }
      }
    }
  };
  return routes;
};

module.exports = { endPointsDetails };
