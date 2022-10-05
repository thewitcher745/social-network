const postRoutes = require("./postRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const { postValidator } = require("../middleware/postValidator");
const {
  signInValidator,
  signUpValidator,
} = require("../middleware/authvalidator");
const { updateUserValidator } = require("../middleware/userValidator");
const rootValidator = require("../middleware/rootValidator");

// The root validator MUST be called as the very last one, so it will contain all the potential errors
module.exports = function masterRouter(app) {
  app.get("/", rootValidator, postRoutes);
  app.post("/post", postValidator(), rootValidator, postRoutes);
  app.post("/removePost", rootValidator, postRoutes);

  app.post("/signup", signUpValidator(), rootValidator, authRoutes);
  app.post("/signin", signInValidator(), rootValidator, authRoutes);
  app.post("/signout", rootValidator, authRoutes);

  app.get("/getAllUsers", rootValidator, userRoutes);
  app.get("/user/:id", rootValidator, userRoutes);
  app.post("/updateUser", updateUserValidator(), rootValidator, userRoutes);
  app.post("/deleteUser", rootValidator, userRoutes);

  return app;
};
