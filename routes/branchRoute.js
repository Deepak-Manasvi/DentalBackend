const express = require("express");
const {
  createBranch,
  getAllBranch,
  getBranchById,
  updateBranchById,
  deleteBranchById,
} = require("../Controllers/branchController");
const router = express.Router();

router.post("/createBranch", createBranch);
router.get("/getAllBranch", getAllBranch);
router.get("/getBranchById/:id", getBranchById);
router.patch("/updateBranchById/:id", updateBranchById);
router.delete("/deleteBranchById/:id", deleteBranchById);

module.exports = router;
