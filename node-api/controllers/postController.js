const PostModel = require("../models/postModel");

const getUserPosts = (req, res) => {
  PostModel.find({ postedBy: req.params.id })
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
};

const getAllPosts = (req, res) => {
  PostModel.find()
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
};

const createPost = (req, res, next) => {
  const post = new PostModel(req.body);
  post.save().then((post) => console.log(post));

  res.json(req.body);
};

const removePost = (req, res) => {
  PostModel.deleteOne({ _id: req.body._id })
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => console.log(err));
};

module.exports = { getUserPosts, getAllPosts, createPost, removePost };
