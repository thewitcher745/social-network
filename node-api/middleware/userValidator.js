const UserModel = require("../models/UserModel");
const { body, oneOf } = require("express-validator");

// Note the relatively specific format of the asynchronous validator
// The FIND object must be returned, which takes a function itself and returns a Promise.reject() object
const repetitivePasswordCheck = (password, { req }) => {
  return UserModel.findOne({ _id: req.body._id }).then((user) => {
    if (user.encryptPassword(password) === user.hashed_password) {
      return Promise.reject();
    }
  });
};

const updateUserValidator = (req, res, next) => {
  const rules = [];

  // Name check
  rules.push(
    body("name").optional().notEmpty().withMessage("Name cannot be empty.")
  );

  // Email check
  rules.push(
    body("email")
      .optional() // optional() makes it so that this field isn't required, and if its not in the req body it won't cause an error
      .notEmpty()
      .withMessage("Email cannot be empty.")
      .isEmail()
      .withMessage("Email format isn't valid.")
  );

  // Password check
  rules.push(
    body("password")
      .optional()
      .isLength({
        min: 8,
      })
      .withMessage("Password must be at least 8 characters.")
      .matches(/\d/)
      .withMessage("Password must contain a number.")
      .custom(repetitivePasswordCheck)
      .withMessage("Password is repeated.")
  );

  return rules;
};

module.exports = { updateUserValidator };
