const { validationResult } = require("express-validator");

// The root validator doesn't need to get invoked while being called as a middleware. Check app.js > app.use()
const rootValidator = (req, res, next) => {
  const errors = validationResult(req); // This line returns a Result object with all the errors from th previous validator inside of its errors property.

  if (errors.isEmpty()) next();
  else {
    return res.status(400).json({ error: errors.errors[0] });
  }
};

module.exports = rootValidator;
