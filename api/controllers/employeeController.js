const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const errorHandlerMiddleware = require("../middleware/errorHandlerMiddleware");
const { createError, createSuccess } = require("../utils/errorMessages");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll(); // Removed isDeleted check
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employees", error });
  }
};

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({
      where: { desk_employee_id: id },
    });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employee", error });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    if (!employeeData || !employeeData.desk_employee_id) {
      return res.json({ message: "desk_employee_id is missing", status: 0 });
    }

    // Check if the employee with the provided desk_employee_id already exists
    const existingEmployee = await Employee.findOne({
      where: { desk_employee_id: employeeData.desk_employee_id },
    });

    if (existingEmployee) {
      return res.json({ message: "Employee with this desk_employee_id already exists", status: 0 });
    }

    // Create the new employee, using the desk_employee_id passed from the request body
    const newEmployee = await Employee.create({
      desk_employee_id: employeeData.desk_employee_id,  // Using provided desk_employee_id
      name: employeeData.name,
      email: employeeData.email,
      group_name: employeeData.group_name,
      profile_url: employeeData.profile_url,
      is_online: employeeData.is_online,
      arrived: employeeData.arrived,
      left: employeeData.left,
      late: employeeData.late,
      online_time: employeeData.online_time,
      offline_time: employeeData.offline_time,
      desktime_time: employeeData.desktime_time,
      at_work_time: employeeData.at_work_time,
      after_work_time: employeeData.after_work_time,
      before_work_time: employeeData.before_work_time,
      productive_time: employeeData.productive_time,
      productivity: employeeData.productivity,
      efficiency: employeeData.efficiency,
      work_starts: employeeData.work_starts,
      work_ends: employeeData.work_ends,
    });

    // Return the newly created employee data
    return res.json({
      message: "Employee successfully created",
      status: 1,
      newEmployee,
    });
  } catch (error) {
    console.log(`Exception: ${error.message}`);
    return errorHandlerMiddleware(error, req, res);
  }
};


exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, group_name } = req.body;

  try {
    if (!name || !email || !group_name) {
      return res.json({ message: "Required fields are missing", status: 0 });
    }

    const employee = await Employee.findOne({
      where: { desk_employee_id: id },
    });

    if (!employee) {
      return res.json({ message: "Employee not found", status: 0 });
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

exports.toggleEmployeeStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({
      where: { desk_employee_id: id },
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Toggle the status logic (no isDeleted field anymore)
    employee.status = employee.status === "active" ? "inactive" : "active"; // Example of toggling status
    await employee.save();

    const status = employee.status === "inactive" ? "deactivated" : "activated";
    res.status(200).json({ message: `Employee has been ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Error toggling employee status", error });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params; // Get employee ID from params
  try {
    // Find the employee by desk_employee_id
    const employee = await Employee.findOne({
      where: { desk_employee_id: id },
    });

    if (employee) {
      employee.status = "inactive";
      await employee.save();
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Employee.findOne({
      where: { desk_employee_id: id },
    });

    if (!project) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await project.destroy();
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting Employee:", error);
    res.status(500).json({ message: "Failed to delete Employee" });
  }
};

exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find employee by email
    const employee = await Employee.findOne({
      where: { email },
    });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
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
