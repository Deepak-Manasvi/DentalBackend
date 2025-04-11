const express = require("express");
const { userLogin, userRegister } = require("../Controllers/userController");
const router = express.Router();

router.post("/userLogin", userLogin);
router.post("/userRegister", userRegister);

module.exports = router;


