const PostModel = require("../models/postModel");
const fs = require("fs");

const includeFormData = async (req, res, next) => {
  const post = new PostModel(req.fields);
  post.postedBy = req.auth._id;

  if (req.files.photo) {
    //   Convert the uploaded file to a filestream and save it to the model
    post.photo = fs.readFileSync(req.files.photo.path);
    post.photo.contentType = req.files.photo.type;
  }
  req.body = req.fields;
  req.post = post;
  next();
};

module.exports = { includeFormData };
