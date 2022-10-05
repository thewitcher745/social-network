const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/getAllUsers", userController.getAllUsers);
router.get("/user/:id", userController.getUser);
router.post("/updateUser", userController.updateUser);

module.exports = router;
