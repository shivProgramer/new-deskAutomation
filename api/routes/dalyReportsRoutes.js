const express = require('express');
const router = express.Router();
const dalyReportsController = require('../controllers/dalyReportsController'); // Adjust the path as per your directory structure
const { verifyToken } = require('../middleware/authMiddleware');

// Define routes
router.get('/',verifyToken, dalyReportsController.getAllReports);
router.get('/:id', verifyToken ,dalyReportsController.getReportById);
router.post('/', verifyToken ,dalyReportsController.createReport);
router.put('/:id',verifyToken, dalyReportsController.updateReport);
router.delete('/:id',verifyToken, dalyReportsController.deleteReport);

module.exports = router;