const PostModel = require("../models/postModel");

const getUserPosts = (req, res) => {
  PostModel.find({ postedBy: req.params.id })
    .sort("createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => res.status(400).json({ error: error }));
};

const getAllPosts = (req, res) => {
  PostModel.find()
    .sort("createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => res.status(400).json({ error: error }));
};

const createPost = (req, res, next) => {
  const post = new PostModel(req.body);
  post
    .save()
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json({ error: error }));
};

const removePost = (req, res) => {
  PostModel.deleteOne({ _id: req.body._id })
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((err) => res.status(400).json({ error: error }));
};

module.exports = { getUserPosts, getAllPosts, createPost, removePost };
