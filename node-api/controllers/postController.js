const { validationResult } = require("express-validator");

const PostModel = require("../models/postModel");

const getPosts = (req, res) => {
  PostModel.find()
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
};

const createPost = (req, res) => {
  const post = new PostModel(req.body);

  post.save().then((result) => {
    res.json({
      post: result,
    });
  });
};

const removePost = (req, res) => {
  const posts = PostModel.deleteOne({ _id: req.body._id })
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => console.log(err));
};

module.exports = { getPosts, createPost, removePost };
