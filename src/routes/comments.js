const express = require("express");
const router = express.Router();

 //#1
const commentController = require("../controllers/commentController");
const validation = require("./validations");

 // #2
router.post("/topics/:topicId/posts/:postId/comments/create",
  validation.validateComments,
  commentController.create);

 // #3
router.post("/topics/:topicId/posts/:postId/comments/:id/destroy",
  commentController.destroy);
module.exports = router;
