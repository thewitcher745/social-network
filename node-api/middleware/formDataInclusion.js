const PostModel = require("../models/postModel");
const fs = require("fs");
const mongoose = require("mongoose");

const includeFormData = async (req, res, next) => {
  const post = new PostModel(req.fields);
  if (req.files.photo) {
    //   Convert the uploaded file to a filestream and save it to the model
    post.photo = fs.readFileSync(req.files.photo.path);
    post.photo.contentType = req.files.photo.type;
  }
  req.body = req.fields; // Used to validate title and body in postValidator.createPostValidator
  req.body.photo = post.photo;
  req.body.postedBy = req.auth._id; // Used to add postedBy as ObjectId
  next();
};

module.exports = { includeFormData };
