const formidableMiddleware = require("express-formidable-v2");

const postController = require("../controllers/postController");

const postRoutes = require("./postRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const { createPostValidator } = require("../middleware/postValidator");
const {
  includeFormData,
  excludeFormData,
} = require("../middleware/formDataInclusion");
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
  // Post-related routes
  app.get("/", rootValidator, postRoutes);
  // app.post(
  //   "/post",
  //   requireSignIn,
  //   requireSignInError,
  //   postValidator(),
  //   rootValidator,
  //   postRoutes
  // );

  app.post(
    "/post",
    formidableMiddleware(),
    requireSignIn,
    requireSignInError,
    includeFormData,
    createPostValidator,
    rootValidator,
    postRoutes
  );

  app.post(
    "/removePost",
    requireSignIn,
    requireSignInError,
    rootValidator,
    postRoutes
  );

  // Authentication-related routes
  app.post("/signup", signUpValidator, rootValidator, authRoutes);
  app.post("/signin", signInValidator, rootValidator, authRoutes);
  app.post(
    "/signout",
    requireSignIn,
    requireSignInError,
    rootValidator,
    authRoutes
  );

  // User-related routes
  app.get(
    "/getAllUsers",
    requireSignIn,
    requireSignInError,
    rootValidator,
    userRoutes
  );
  app.get(
    "/user/:id",
    requireSignIn,
    requireSignInError,
    getUserValidator,
    rootValidator,
    userRoutes
  );
  app.post(
    "/updateUser",
    requireSignIn,
    requireSignInError,
    updateUserValidator,
    rootValidator,
    userRoutes
  );
  app.post(
    "/deleteUser",
    requireSignIn,
    requireSignInError,
    deleteUserValidator,
    rootValidator,
    userRoutes
  );

  return app;
};
