const express = require('express');
const { getDashboardData } = require('../controllers/DashboardController');

const router = express.Router();

// Route to get dashboard data
router.get('/', getDashboardData);

module.exports = router;
