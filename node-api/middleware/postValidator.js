const { body } = require("express-validator");

// This file defines a function which has to be called to be used as a middleware, as in the
// middleware version should have () at the end, as opposed to the rootValidator.

const postValidator = (req, res, next) => {
  const rules = []; // If you need separate messages for each rule, add them to an array and return that array.
  // Otherwise you can chain rules such as isLength and notEmpty but they will have a single message
  // Also apparently rules cannot be empty

  // Title check
  rules.push(body("title", "Title is empty.").notEmpty());
  rules.push(
    body("title", "Title must be proper length.").isLength({ min: 4, max: 150 })
  );

  // Body check
  rules.push(body("body", "Body is empty.").notEmpty());
  rules.push(
    body("body", "Body must be proper length.").isLength({
      min: 4,
      max: 2000,
    })
  );

  return rules;
};

module.exports = { postValidator };
