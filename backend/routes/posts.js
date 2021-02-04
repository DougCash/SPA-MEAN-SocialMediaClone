const express = require("express");
const router = express.Router();

//Importing middleware that handles file manipulation and authorizes login
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

//Import appropriate controller
const PostController = require("../controllers/posts")

//Router directs to appropriate middlewares and controller functionality
router.post("",checkAuth, extractFile, PostController.createPost);
router.put("/:id", checkAuth, extractFile, PostController.updatePost);
router.get("", PostController.getPosts);
router.get("/:id", PostController.getPost);
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
