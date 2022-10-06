const { body, check } = require("express-validator");

// This file defines a function which has to be called to be used as a middleware, as in the
// middleware version should have () at the end, as opposed to the rootValidator.

const createPostValidator = [];

// Title check
createPostValidator.push(
  body("title")
    .notEmpty()
    .withMessage("Title is empty.")
    .isLength({ min: 4, max: 150 })
    .withMessage("Title must be proper length.")
);

// Body check
createPostValidator.push(
  body("body")
    .notEmpty()
    .withMessage("Body is empty.")
    .isLength({
      min: 4,
      max: 2000,
    })
    .withMessage("Body must be proper length.")
);
// If you need separate messages for each rule, add them to an array and return that array.
// Otherwise you can chain rules such as isLength and notEmpty but they will have a single message
// Also apparently rules cannot be empty

module.exports = { createPostValidator };
