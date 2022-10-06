const postRoutes = require("./postRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const { postValidator } = require("../middleware/postValidator");
const {
  signInValidator,
  signUpValidator,
  requireSignIn,
  requireSignInError,
} = require("../middleware/authvalidator");
const {
  updateUserValidator,
  getUserValidator,
  deleteUserValidator,
} = require("../middleware/userValidator");
const rootValidator = require("../middleware/rootValidator");

// The root validator MUST be called as the very last one, so it will contain all the potential errors
module.exports = function masterRouter(app) {
  app.get("/", rootValidator, postRoutes);
  app.post("/post", postValidator(), rootValidator, postRoutes);
  app.post("/removePost", rootValidator, postRoutes);

  app.post("/signup", signUpValidator(), rootValidator, authRoutes);
  app.post("/signin", signInValidator(), rootValidator, authRoutes);
  app.post("/signout", rootValidator, authRoutes);

  app.get(
    "/getAllUsers",
    requireSignIn,
    requireSignInError,
    rootValidator,
    userRoutes
  );
  app.get("/user/:id", getUserValidator(), rootValidator, userRoutes);
  app.post("/updateUser", updateUserValidator(), rootValidator, userRoutes);
  app.post("/deleteUser", deleteUserValidator(), rootValidator, userRoutes);

  return app;
};
