const { body } = require("express-validator");
const { expressjwt: expressJwt } = require("express-jwt");

// This file defines a function which has to be called to be used as a middleware, as in the
// middleware version should have () at the end, as opposed to the rootValidator.

const signUpValidator = []; // If you need separate messages for each rule, add them to an array and return that array.
// Otherwise you can chain rules such as isLength and notEmpty but they will have a single message (Can also use withMessage)
// Also apparently rules cannot be empty

// Name check
signUpValidator.push(body("name", "Name cannot be empty.").notEmpty());

// Email check
signUpValidator.push(
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Email format isn't valid.")
);

// Password check
signUpValidator.push(
  body("password")
    .isLength({
      min: 8,
    })
    .withMessage("Password must be at least 8 characters.")
    .matches(/\d/)
    .withMessage("Password must contain a number.")
);

//________________________________________________________________________________________
const signInValidator = [];

// Email check
signInValidator.push(
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Email format isn't valid.")
);

// Password check
signInValidator.push(body("password", "Password cannot be empty.").notEmpty());

//________________________________________________________________________________________
// Configures the authorization check as a middleware
// If there is a token, appends an object called auth to the request which containes the _id
const requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// Make the error response more friendly
const requireSignInError = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "You must be authorized for this action." });
  }
  next();
};

module.exports = {
  signUpValidator,
  signInValidator,
  requireSignIn,
  requireSignInError,
};
