const express = require("express");

const UserController = require("./UserController");

const router = express.Router();
const userController = new UserController();

router.post("/login", userController.login);

module.exports = router;
