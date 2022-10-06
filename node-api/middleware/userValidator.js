const UserModel = require("../models/UserModel");
const { body, param } = require("express-validator");

// Note the relatively specific format of the asynchronous validator
// The FIND object must be returned, which takes a function itself and returns a Promise.reject() object
const repetitivePasswordCheck = (password, { req }) => {
  return UserModel.findOne({ _id: req.body._id }).then((user) => {
    if (user.encryptPassword(password) === user.hashed_password) {
      return Promise.reject();
    }
  });
};

const updateUserValidator = [];
//____________________________________________________________________________________
// Id check
updateUserValidator.push(
  body("_id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Request ID has invalid length.")
);

// Name check
updateUserValidator.push(
  body("name").optional().notEmpty().withMessage("Name cannot be empty.")
);

// Email check
updateUserValidator.push(
  body("email")
    .optional() // optional() makes it so that this field isn't required, and if its not in the req body it won't cause an error
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Email format isn't valid.")
);

// Password check
updateUserValidator.push(
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

//____________________________________________________________________________________
const getUserValidator = [];

// Id check
getUserValidator.push(
  param("id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Request ID has invalid length.")
);

//____________________________________________________________________________________
const deleteUserValidator = [];

// Id check
deleteUserValidator.push(
  body("_id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Request ID has invalid length.")
);

module.exports = { updateUserValidator, getUserValidator, deleteUserValidator };
