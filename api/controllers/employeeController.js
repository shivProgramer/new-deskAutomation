const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Get all employees
exports.getAllEmployees = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.findAll({
      where: { isDeleted: false , user_id:id }, 
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

// Create a new employee
exports.createEmployee = async (req, res) => {
  const {
    name,
    email,
    group_id,
    group_name,
    profile_url,
    user_id,
    password, // New field
  } = req.body;

  try {
    // Validate required fields
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Hash the password before saving it to the database
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new employee with the hashed password
    const newEmployee = await Employee.create({
      name,
      email,
      group_id,
      group_name,
      profile_url,
      user_id,
      password: passwordHash, // Save hashed password
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error creating employee",
      error: error.message,
    });
  }
};

// Update an employee's details
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    group_id,
    group_name,
    profile_url,
    user_id,
    password, // New field for update
  } = req.body;

  try {
    // Find employee by ID
    const employee = await Employee.findOne({ where: { desk_employee_id: id } });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update employee details with new values or keep existing
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.group_id = group_id || employee.group_id;
    employee.group_name = group_name || employee.group_name;
    employee.profile_url = profile_url || employee.profile_url;
    employee.user_id = user_id || employee.user_id;

    // Update password if provided and hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      employee.password = hashedPassword; // Save the hashed password
    }

    // Save the updated employee details to the database
    await employee.save();

    // Return the updated employee
    res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee", error });
  }
};

// Deactivate/Activate employee (soft delete)
exports.toggleEmployeeStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({ where: { desk_employee_id: id } });
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
exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find employee by email
    const employee = await Employee.findOne({ where: { email, isDeleted: false } });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found or is deleted." });
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
      { expiresIn: "1d" }  // Token expiration time (e.g., 1 day)
    );

    res.json({ message: "Login successful", token, employeeData: employee });
  } catch (err) {
    console.error("Error logging in employee:", err);
    res.status(500).json({ error: "An error occurred during login." });
  }
};

