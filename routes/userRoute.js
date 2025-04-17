const express = require("express");
const { userLogin, userRegister, signUpAdmin, loginAdmin, verifyOtp } = require("../Controllers/userController");
const router = express.Router();

router.post("/userLogin", userLogin);
router.post("/userRegister", userRegister);

router.post("/signUpAdmin", signUpAdmin);
router.post("/loginAdmin", loginAdmin);
router.post("/verifyOtp", verifyOtp);

module.exports = router;


