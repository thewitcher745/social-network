const PostModel = require("../models/postModel");

const getPosts = (req, res) => {
  PostModel.find()
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
};

const createPost = (req, res, next) => {
  res.json(req.post);
};

const removePost = (req, res) => {
  PostModel.deleteOne({ _id: req.body._id })
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => console.log(err));
};

module.exports = { getPosts, createPost, removePost };
