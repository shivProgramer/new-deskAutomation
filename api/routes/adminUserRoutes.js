const express = require("express");
const router = express.Router();
const adminUserController = require("../controllers/adminUserController");

// Registration route
router.post("/register", adminUserController.registerUser);

// Login route
router.post("/login", adminUserController.loginUser);

router.get("/", adminUserController.getAllUsers);

module.exports = router;
