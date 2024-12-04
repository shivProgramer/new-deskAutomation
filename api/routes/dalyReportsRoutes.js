const express = require('express');
const router = express.Router();
const dalyReportsController = require('../controllers/dalyReportsController'); // Adjust the path as per your directory structure

// Define routes
router.get('/', dalyReportsController.getAllReports);
router.get('/:id', dalyReportsController.getReportById);
router.post('/', dalyReportsController.createReport);
router.put('/:id', dalyReportsController.updateReport);
router.delete('/:id', dalyReportsController.deleteReport);

module.exports = router;