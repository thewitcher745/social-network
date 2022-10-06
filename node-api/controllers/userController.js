const UserModel = require("../models/userModel");

const getAllUsers = (req, res) => {
  UserModel.find().then((users) => res.json({ users }));
};

const getUser = (req, res) => {
  UserModel.findOne({ _id: req.params.id }).then((user) => res.json(user)); // params gets assigned to req when the router string containers a :id or similar
};

const updateUser = (req, res) => {
  UserModel.findOne({ _id: req.body._id }).then(async (user) => {
    let updatedUser = user;
    for (property in req.body) {
      updatedUser[property] = req.body[property];
    }
    updatedUser = new UserModel(updatedUser);
    await updatedUser.save().then((user) => res.json(user)); // This will not result in duplicates, as _id is unique across collection
  });
};

const deleteUser = (req, res) => {
  UserModel.deleteOne({ _id: req.body._id }).then((user) => res.json(user));
};

module.exports = { getAllUsers, getUser, updateUser, deleteUser };
