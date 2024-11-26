const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController.js");
const { verifyToken } = require("../middleware/authMiddleware");
// Get all employees
router.get("/:id", verifyToken, employeeController.getAllEmployees);
// Get employee by ID
router.get("/getbyid/:id", verifyToken, employeeController.getEmployeeById);
// Create a new employee
router.post("/", verifyToken, employeeController.createEmployee);
// Update an employee
router.put("/:id", verifyToken, employeeController.updateEmployee);
router.delete("/:id", verifyToken, employeeController.deleteEmployee);
// Deactivate or activate employee (soft delete)
router.patch(
  "/:id",
  verifyToken,
  employeeController.toggleEmployeeStatus
);

// login
router.post("/emp_login", employeeController.loginEmployee);
module.exports = router;
