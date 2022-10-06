const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

if (mongoose.models.Post) module.exports = mongoose.model("Post");
else module.exports = mongoose.model("Post", postSchema);
