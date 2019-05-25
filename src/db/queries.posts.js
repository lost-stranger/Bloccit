const Flair = require("./models").Flair;
const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Comment = require("./models").Comment;
const User = require("./models").User;

module.exports = {

    addPost(newPost, callback){
        return Post.create(newPost)
        .then((post) => {
            callback(null, post);
        })
        .catch((err) => {
            callback(err);
        })
      },

      getPost(id, callback){
        return Post.findById(id, {
          include: [
         {model: Comment, as: "comments", include: [
           {model: User }
         ]}
       ]
        })
        .then((post) => {
          callback(null, post);
        })
        .catch((err) => {
          callback(err);
        })
      },

      deletePost(req, callback){
        return Post.destroy({
          where: {req.params.id }
        })
        .then((deletedRecordsCount) => {
          callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          callback(err);
        })
      },

      updatePost(req, updatedPost, callback) {
    return Post.findById(req.params.id)
        .then((post) => {
          if(!post){
            return callback("Post not found");
          }

          post.update(updatedPost, {
            fields: Object.keys(updatedPost)
          })
          .then(() => {
            callback(null, post);
          })
          .catch((err) => {
            callback(err);
          });
        });
      }
}
