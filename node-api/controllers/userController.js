const UserModel = require("../models/userModel");

const getAllUsers = (req, res) => {
  UserModel.find().then((users) => res.json({ users }));
};

const getUser = (req, res) => {
  UserModel.findById(req.params.id).then((user) => {
    if (user) res.json(user);
    else res.status(404).json({ error: "User not found." });
  }); // params gets assigned to req when the router string containers a :id or similar
};

const updateUser = (req, res) => {
  UserModel.findById(req.body._id).then(async (user) => {
    if (user) {
      let updatedUser = user;
      for (property in req.body) {
        updatedUser[property] = req.body[property];
      }
      updatedUser = new UserModel(updatedUser);
      await updatedUser.save().then((user) => res.json(user)); // This will not result in duplicates, as _id is unique across collection
    } else res.status(404).json({ error: "User not found." });
  });
};

const deleteUser = (req, res) => {
  UserModel.findOneAndDelete({ _id: req.body._id }).then((user) => {
    if (user) res.json(user);
    else res.status(404).json({ error: "User not found." });
  });
};

module.exports = { getAllUsers, getUser, updateUser, deleteUser };
