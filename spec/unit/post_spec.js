const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {

  beforeEach((done) => {
    //#1
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      //#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        //#3
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          //#4
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });
  describe("#create()", () => {

    it("should create a post object with a title, body, and assigned topic", (done) => {
      //#1
      Post.create({
        title: "Pros of Cryosleep during the long journey",
        body: "1. Not having to answer the 'are we there yet?' question.",
        topicId: this.topic.id
      })
      .then((post) => {

        //#2
        expect(post.title).toBe("Pros of Cryosleep during the long journey");
        expect(post.body).toBe("1. Not having to answer the 'are we there yet?' question.");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it("should not create a post with missing title, body, or assigned topic", (done) => {
      Post.create({
        title: "Pros of Cryosleep during the long journey"
      })
      .then((post) => {

        // the code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there

        done();

      })
      .catch((err) => {

        expect(err.message).toContain("Post.body cannot be null");
        expect(err.message).toContain("Post.topicId cannot be null");
        done();

      })
    });

  });
  describe("#setTopic()", () => {

  it("should associate a topic and a post together", (done) => {

// #1
    Topic.create({
      title: "Challenges of interstellar travel",
      description: "1. The Wi-Fi is terrible"
    })
    .then((newTopic) => {

// #2
      expect(this.post.topicId).toBe(this.topic.id);
// #3
      this.post.setTopic(newTopic)
      .then((post) => {
// #4
        expect(post.topicId).toBe(newTopic.id);
        done();

      });
    })
  });

});
describe("#getTopic()", () => {
   it("should return the associated topic", (done) => {

     this.post.getTopic()
     .then((associatedTopic) => {
       expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
       done();
     });

   });

 });
 describe("GET /topics/:topicId/posts/new", () => {

  it("should render a new post form", (done) => {
    request.get(`${base}/${this.topic.id}/posts/new`, (err, res, body) => {
      expect(err).toBeNull();
      expect(body).toContain("New Post");
      done();
    });
  });

});
describe("POST /topics/:topicId/posts/create", () => {

  it("should create a new post and redirect", (done) => {
     const options = {
       url: `${base}/${this.topic.id}/posts/create`,
       form: {
         title: "Watching snow melt",
         body: "Without a doubt my favoriting things to do besides watching paint dry!"
       }
     };
     request.post(options,
       (err, res, body) => {

         Post.findOne({where: {title: "Watching snow melt"}})
         .then((post) => {
           expect(post).not.toBeNull();
           expect(post.title).toBe("Watching snow melt");
           expect(post.body).toBe("Without a doubt my favoriting things to do besides watching paint dry!");
           expect(post.topicId).not.toBeNull();
           done();
         })
         .catch((err) => {
           console.log(err);
           done();
         });
       }
     );
   });

});
describe("GET /topics/:topicId/posts/:id", () => {

  it("should render a view with the selected post", (done) => {
    request.get(`${base}/${this.topic.id}/posts/${this.post.id}`, (err, res, body) => {
      expect(err).toBeNull();
      expect(body).toContain("Snowball Fighting");
      done();
    });
  });

});
describe("POST /topics/:topicId/posts/:id/destroy", () => {

  it("should delete the post with the associated ID", (done) => {

//#1
    expect(post.id).toBe(1);

    request.post(`${base}/${this.topic.id}/posts/${this.post.id}/destroy`, (err, res, body) => {

//#2
      Post.findById(1)
      .then((post) => {
        expect(err).toBeNull();
        expect(post).toBeNull();
        done();
      })
    });

  });

});
describe("GET /topics/:topicId/posts/:id/edit", () => {

  it("should render a view with an edit post form", (done) => {
    request.get(`${base}/${this.topic.id}/posts/${this.post.id}/edit`, (err, res, body) => {
      expect(err).toBeNull();
      expect(body).toContain("Edit Post");
      expect(body).toContain("Snowball Fighting");
      done();
    });
  });

});
describe("POST /topics/:topicId/posts/:id/update", () => {

  it("should return a status code 302", (done) => {
    request.post({
      url: `${base}/${this.topic.id}/posts/${this.post.id}/update`,
      form: {
        title: "Snowman Building Competition",
        body: "I love watching them melt slowly."
      }
    }, (err, res, body) => {
      expect(res.statusCode).toBe(302);
      done();
    });
  });

  it("should update the post with the given values", (done) => {
      const options = {
        url: `${base}/${this.topic.id}/posts/${this.post.id}/update`,
        form: {
          title: "Snowman Building Competition"
        }
      };
      request.post(options,
        (err, res, body) => {

        expect(err).toBeNull();

        Post.findOne({
          where: {id: this.post.id}
        })
        .then((post) => {
          expect(post.title).toBe("Snowman Building Competition");
          done();
        });
      });
  });

});
});
