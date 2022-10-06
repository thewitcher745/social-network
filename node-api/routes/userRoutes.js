const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/getAllUsers", userController.getAllUsers);
router.get("/user/:userId", userController.getUser);
router.post("/updateUser", userController.updateUser);
router.delete("/deleteUser", userController.deleteUser);

module.exports = router;
