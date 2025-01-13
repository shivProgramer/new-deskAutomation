const express = require("express");
const router = express.Router();
const employeeOffdayController = require("../controllers/Employee_OffdayController"); // Path to your controller

// Get all employee offdays
router.get("/", employeeOffdayController.getAllEmployeeOffdays);

// Get employee offday by ID
router.get("/:id", employeeOffdayController.getEmployeeOffdayById);

// Create a new employee offday
router.post("/", employeeOffdayController.createEmployeeOffday);

// Update an employee offday by ID
router.put("/:id", employeeOffdayController.updateEmployeeOffday);

// Delete an employee offday by ID
router.delete("/:id", employeeOffdayController.deleteEmployeeOffday);

module.exports = router;
