const UserModel = require("../models/userModel");

const getAllUsers = (req, res) => {
  UserModel.find().then((users) => res.json({ users }));
};

const getUser = (req, res) => {
  UserModel.findOne({ _id: req.params.id }).then((user) => res.json(user));
};

const updateUser = (req, res) => {
  UserModel.findOne({ _id: req.body._id }).then(async (user) => {
    let updatedUser = user;
    for (property in req.body) {
      updatedUser[property] = req.body[property];
    }
    updatedUser = new UserModel(updatedUser);
    updatedUser.id = "800";
    await updatedUser.save().then((user) => res.json(user)); // This will not result in duplicates, as _id is unique across collection
  });
};

module.exports = { getAllUsers, getUser, updateUser };
