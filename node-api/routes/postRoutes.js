const express = require("express");

const postController = require("../controllers/postController");

const router = express.Router();

router.get("/posts/by/:userId", postController.getUserPosts);
router.get("/getAllPosts", postController.getAllPosts);
router.post("/post", postController.createPost);
router.post("/removePost", postController.removePost);

module.exports = router;
