const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize } = require('sequelize');
const errorHandlerMiddleware = require("../middleware/errorHandlerMiddleware");
const { createError, createSuccess } = require("../utils/errorMessages");
// Get all employees
exports.getAllEmployees = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.findAll({
      where: { isDeleted: false },
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employees", error });
  }
};

// Get a single employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({
      where: { desk_employee_id: id, isDeleted: false },
    });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found or is deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employee", error });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;

    // Check if the required data exists
    if (!employeeData) {
      return res.json({ message: "Data is null or missing", status: 0 });
    }

    // Check if the email already exists
    const existingEmployee = await Employee.findOne({
      where: { email: employeeData.email },
    });
    if (existingEmployee) {
      return res.json({ message: "email is already exist", status: 0 });
    }
    // Hash the password
    const passwordHash = await bcrypt.hash(employeeData.password, 10);
    // Create a new employee
    const newEmployee = await Employee.create({
      name: employeeData.name,
      email: employeeData.email,
      group_name: employeeData.group_name,
      user_id: employeeData.user_id,
      password: passwordHash,
    });

    // Return success response
    return res.json({
      message: "Employee successfully created",
      status: 1,
      newEmployee,
    });
  } catch (error) {
    console.log(`Exception: ${error.message}`);
    return errorHandlerMiddleware(error, req, res); // Pass the error directly
  }
};


exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, group_name, user_id, password } = req.body;

  try {
    
    if (!name || !email || !group_name || !user_id) {
      return res.json({ message: "Required fields are missing", status: 0 });
    }
    const employee = await Employee.findOne({
      where: { desk_employee_id: id, isDeleted: false },
    });
    if (!employee) {
      return res.json({
        message: "Employee not found or is deleted",
        status: 0,
      });
    }
    const existingEmployee = await Employee.findOne({
      where: { email, desk_employee_id: { [Sequelize.Op.ne]: id } },
    });
    if (existingEmployee) {
      return res.json({
        message: "Email is already in use by another employee",
        status: 0,
      });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.group_name = group_name || employee.group_name;
    employee.user_id = user_id || employee.user_id;

    // Update password if provided and hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      employee.password = hashedPassword; // Save the hashed password
    }

    // Save the updated employee details to the database
    await employee.save();

    // Return success response
    res.json({
      message: "Employee updated successfully",
      status: 1,
      employee,
    });
  } catch (error) {
    console.log(`Exception: ${error.message}`);
    return errorHandlerMiddleware(error, req, res); 
  }
};

// Deactivate/Activate employee (soft delete)
exports.toggleEmployeeStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({
      where: { desk_employee_id: id },
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Toggle the isDeleted status
    employee.isDeleted = !employee.isDeleted;
    await employee.save();

    const status = employee.isDeleted ? "deactivated" : "activated";
    res.status(200).json({ message: `Employee has been ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Error toggling employee status", error });
  }
};

// login api

// delete api
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params; // Get employee ID from params
  try {
    // Find the employee by desk_employee_id
    const employee = await Employee.findOne({
      where: { desk_employee_id: id, isDeleted: false },
    });

    // If employee exists
    if (employee) {
      // Update the employee to mark it as deleted (soft delete)
      employee.isDeleted = true;
      await employee.save();

      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Employee not found or already deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find employee by email
    const employee = await Employee.findOne({
      where: { email, isDeleted: false },
    });
    if (!employee) {
      return res
        .status(404)
        .json({ error: "Employee not found or is deleted." });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Generate JWT (if needed for employee)
    const token = jwt.sign(
      { employeeId: employee.desk_employee_id, email: employee.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expiration time (e.g., 1 day)
    );

    res.json({ message: "Login successful", token, employeeData: employee });
  } catch (err) {
    console.error("Error logging in employee:", err);
    res.status(500).json({ error: "An error occurred during login." });
  }
};
