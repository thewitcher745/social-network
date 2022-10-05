const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

if (mongoose.models.Post) module.exports = mongoose.model("Post");
else module.exports = mongoose.model("Post", postSchema);
