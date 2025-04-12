const express = require("express");
const { createBranch, getAllBranch, getBranchById, updateBranchById, deleteBranchById } = require("../Controllers/branchController");
const router = express.Router();

router.post("/createBranch", createBranch);
router.get("/getAllBranch", getAllBranch);
router.get("/getBranchById", getBranchById);
router.patch("/updateBranchById", updateBranchById);
router.delete("/deleteBranchById", deleteBranchById);

module.exports = router;