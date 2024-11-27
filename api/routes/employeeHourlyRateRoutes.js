const express = require('express');
const {
  createEmployeeHourlyRate,
  getAllEmployeeHourlyRates,
  getEmployeeHourlyRateById,
  updateEmployeeHourlyRate,
  deleteEmployeeHourlyRate,
} = require('../controllers/employeeHourlyRateController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new Employee Hourly Rate
router.post('/',verifyToken, createEmployeeHourlyRate);

// Get all Employee Hourly Rates
router.get('/',verifyToken, getAllEmployeeHourlyRates);

// Get a specific Employee Hourly Rate by ID
router.get('/:id',verifyToken, getEmployeeHourlyRateById);

// Update an Employee Hourly Rate by ID
router.put('/:id',verifyToken, updateEmployeeHourlyRate);

// Delete an Employee Hourly Rate by ID
router.delete('/:id',verifyToken, deleteEmployeeHourlyRate);

module.exports = router;
