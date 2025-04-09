const express = require("express");
const { userLogin, registerUser } = require("../Controllers/userController");
const router = express.Router();

// const { auth, isAdmin } = require("../middlewares/auth");

// 🔐 Login Route
router.post("/login", userLogin);
router.post("/register", registerUser);

// 🧑‍💼 Protected Admin Route Example
// router.get("/dashboard", auth, isAdmin, adminController.getDashboard);

module.exports = router;


