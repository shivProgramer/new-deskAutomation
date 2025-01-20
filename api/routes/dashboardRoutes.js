const express = require('express');
const { getallDashboard } = require('../controllers/DashboardController');

const router = express.Router();
router.get('/', getallDashboard);

module.exports = router;
