const express = require("express");
const { getAllProjects,toggleProjectStatus,sendReport,updateEmployee } = require("../controllers/ecommProjectListController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();
// Get all projects
router.get("/",verifyToken, getAllProjects);
router.put("/status/:project_id",verifyToken, toggleProjectStatus);
router.post("/send-report", verifyToken ,sendReport);
router.put("/:project_id/employee",verifyToken, updateEmployee);
module.exports = router;
