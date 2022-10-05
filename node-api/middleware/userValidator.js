const updateUserValidator = (req, res, next) => {
  const rules = []; // If you need separate messages for each rule, add them to an array and return that array.
  // Otherwise you can chain rules such as isLength and notEmpty but they will have a single message (Can also use withMessage)
  // Also apparently rules cannot be empty

  // Name check
  rules.push(body("name", "Name cannot be empty.").notEmpty());

  // Email check
  rules.push(body("email", "Email cannot be empty.").notEmpty());
  rules.push(body("email", "Email format isn't valid.").isEmail());

  // Password check
  rules.push(
    body("password", "Password must be at least 8 characters.")
      .isLength({
        min: 8,
      })
      .matches(/\d/)
      .withMessage("Password must contain a number.")
  );

  return rules;
};

module.exports = { updateUserValidator };
