const express = require("express");

const UserController = require("./UserController");

const router = express.Router();
const userController = new UserController();

router.post("/login", userController.login);
router.get("/logout", userController.authMiddleware, userController.logout);
router.get("/me", userController.authMiddleware, userController.me);

module.exports = router;
