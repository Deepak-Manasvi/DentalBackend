const express = require("express");
const { userLogin, userRegister, signUpAdmin, loginAdmin, verifyOtp, getAllUser, getAdminById, getUserById, deleteUserById, updateUserById } = require("../Controllers/userController");
const router = express.Router();

router.post("/userLogin", userLogin);
router.post("/userRegister", userRegister);

router.post("/signUpAdmin", signUpAdmin);
router.post("/loginAdmin", loginAdmin);
router.post("/verifyOtp", verifyOtp);

router.get("/getAllUser", getAllUser);
router.get("/getUserById/:id", getUserById);
router.patch("/updateUserById/:id", updateUserById);
router.delete("/deleteUserById/:id", deleteUserById);
router.get("/getAdminById/:id", getAdminById);

module.exports = router;


