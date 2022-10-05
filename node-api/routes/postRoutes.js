const express = require("express");

const postController = require("../controllers/postController");

const router = express.Router();

router.get("/", postController.getPosts);
router.post("/post", postController.createPost);
router.post("/removePost", postController.removePost);

module.exports = router;
