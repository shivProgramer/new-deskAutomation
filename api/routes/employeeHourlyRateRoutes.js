const express = require('express');
const {
  createEmployeeHourlyRate,
  getAllEmployeeHourlyRates,
  getEmployeeHourlyRateById,
  updateEmployeeHourlyRate,
  deleteEmployeeHourlyRate,
} = require('../controllers/employeeHourlyRateController');

const router = express.Router();

// Create a new Employee Hourly Rate
router.post('/', createEmployeeHourlyRate);

// Get all Employee Hourly Rates
router.get('/', getAllEmployeeHourlyRates);

// Get a specific Employee Hourly Rate by ID
router.get('/:id', getEmployeeHourlyRateById);

// Update an Employee Hourly Rate by ID
router.put('/:id', updateEmployeeHourlyRate);

// Delete an Employee Hourly Rate by ID
router.delete('/:id', deleteEmployeeHourlyRate);

module.exports = router;
