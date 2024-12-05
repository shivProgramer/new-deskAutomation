const express = require("express");
const { getAllProjects,toggleProjectStatus,sendReport } = require("../controllers/EcommProjectListController");

const router = express.Router();
// Get all projects
router.get("/", getAllProjects);
router.put("/status/:project_id", toggleProjectStatus);
router.post("/send-report", sendReport);
module.exports = router;
