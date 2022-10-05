const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  hashed_password: {
    type: String,
    required: true,
  },

  salt: String,

  created: {
    type: Date,
    default: Date.now,
  },

  updated: Date,
});

// Virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    // generate a salt (per-user encryption key)
    this.salt = uuid();
    // hash the password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  authPassword: function (password) {
    if (!password) return false;
    try {
      return this.encryptPassword(password) === this.hashed_password;
    } catch (err) {
      return false;
    }
  },
};

// Allows for importing the model in multiple places
if (mongoose.models.User) module.exports = mongoose.model("User");
else module.exports = mongoose.model("User", userSchema);
