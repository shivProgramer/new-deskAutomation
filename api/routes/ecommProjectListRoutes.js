const express = require("express");
const { getAllProjects,toggleProjectStatus,sendReport } = require("../controllers/EcommProjectListController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();
// Get all projects
router.get("/",verifyToken, getAllProjects);
router.put("/status/:project_id",verifyToken, toggleProjectStatus);
router.post("/send-report", verifyToken ,sendReport);
module.exports = router;
