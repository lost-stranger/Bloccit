const Post = require("./models").Post;
const Topic = require("./models").Topic;

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
  return Post.findById(id)
  .then((post) => {
    callback(null, post);
  })
  .catch((err) => {
    callback(err);
  })
},

deletePost(id, callback){
  return Post.destroy({
    where: { id }
  })
  .then((deletedRecordsCount) => {
    callback(null, deletedRecordsCount);
  })
  .catch((err) => {
    callback(err);
  })
},
destroy(req, res, next){
  postQueries.deletePost(req.params.id, (err, deletedRecordsCount) => {
    if(err){
      res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`)
    } else {
      res.redirect(303, `/topics/${req.params.topicId}`)
    }
  });
},
updatePost(id, updatedPost, callback){
  return Post.findById(id)
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
