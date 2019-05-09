const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("post", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Expeditions to Alpha Centauri",
                description: "A compilation of reports from recent visits to the star system."
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "My first visit to Proxima Centauri b",
                    body: "I saw some rocks.",
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
        it("should create a topic object with a title and description", (done) => {

            Topic.create({
                title: "Spherical rocks of the universe",
                description: "An encyclopedia of all know planets",
            })
            .then((topic) => {
                expect(topic.title).toBe("Spherical rocks of the universe");
                expect(topic.description).toBe("An encyclopedia of all know planets");
                done();

              })
              .catch((err) => {
                console.log(err);
                done();
            });
        });
        it("should not create a topic with missing title or description", (done) => {
            Topic.create({
                title: "Spherical rocks of the universe",

            })
            .then((topic) => {

                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Topic.description cannot be null");
                done();
            })
        });
    });

    describe("#getPosts()", () => {
        it("should return the associated posts", (done) => {

            this.topic.getPosts()
            .then((posts) => {
                expect(posts[0].title).toBe("My first visit to Proxima Centauri b");
                done();
            });
        });
    });
});
