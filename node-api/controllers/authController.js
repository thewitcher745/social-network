const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const signUp = async (req, res) => {
  const userExists = await UserModel.findOne({ email: req.body.email });

  if (userExists) {
    return res.status(403).json({
      error: "Email is taken.",
    });
  }

  // If email doesn't already exist in DB, create a new user.
  const user = new UserModel(req.body);
  await user.save();
  res.status(200).json({ user });
};

const signIn = async (req, res) => {
  const userExists = await UserModel.findOne({ email: req.body.email });

  if (!userExists) {
    return res.status(403).json({
      error: "User with that email doesn't exist.",
    });
  }

  // If email exists in DB, try signing in.
  if (!userExists.authPassword(req.body.password)) {
    return res.status(403).json({
      error: "Password incorrect.",
    });
  }
  // Generate a token with secret and id
  const token = jwt.sign({ _id: userExists._id }, process.env.JWT_SECRET, {
    algorithm: "HS256",
  });
  res.cookie("t", token, { expire: new Date() + 9999 });

  res.json({ token, user: { userExists } });
};

const signOut = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signed out." });
};

module.exports = { signUp, signIn, signOut };
