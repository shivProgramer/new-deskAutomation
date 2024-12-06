const express = require("express");
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const adhocReportController = require("../controllers/adhocReportController");

// Create a new Adhoc Report
router.post("/",verifyToken, adhocReportController.createAdhocReport);

// Get all Adhoc Reports
router.get("/", verifyToken,adhocReportController.getAllAdhocReports);

// Get a single Adhoc Report by ID
router.get("/:id",verifyToken, adhocReportController.getAdhocReportById);

// Update an Adhoc Report
router.put("/:id",verifyToken, adhocReportController.updateAdhocReport);

// Delete an Adhoc Report
router.delete("/:id",verifyToken, adhocReportController.deleteAdhocReport);

router.get("/execute/:name",verifyToken, adhocReportController.executeStoredProcedure);


module.exports = router;