const EmployeeHourlyRate = require("../models/Employee_Hourly_Rate.jsx");

// Create a new Employee Hourly Rate
const createEmployeeHourlyRate = async (req, res) => {
  try {
    const { employee_name, bill_rate, pay_rate } = req.body;
    const newRate = await EmployeeHourlyRate.create({
      employee_name,
      bill_rate,
      pay_rate,
    });
    res
      .status(201)
      .json({
        message: "Employee hourly rate created successfully",
        data: newRate,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating employee hourly rate",
        error: error.message,
      });
  }
};

// Get all Employee Hourly Rates
const getAllEmployeeHourlyRates = async (req, res) => {
  try {
    const rates = await EmployeeHourlyRate.findAll();
    res.status(200).json(rates);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching employee hourly rates",
        error: error.message,
      });
  }
};

// Get a specific Employee Hourly Rate by ID
const getEmployeeHourlyRateById = async (req, res) => {
  try {
    const { id } = req.params;
    const rate = await EmployeeHourlyRate.findOne({
      where: { employee_id: id },
    });
    if (!rate) {
      return res
        .status(404)
        .json({ message: "Employee hourly rate not found" });
    }
    res.status(200).json(rate);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching employee hourly rate",
        error: error.message,
      });
  }
};

// Update an Employee Hourly Rate by ID
const updateEmployeeHourlyRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_name, bill_rate, pay_rate } = req.body;
    const updated = await EmployeeHourlyRate.update(
      { employee_name, bill_rate, pay_rate },
      { where: { employee_id: id } }
    );
    if (updated[0] === 0) {
      return res
        .status(404)
        .json({ message: "Employee hourly rate not found or no changes made" });
    }
    res
      .status(200)
      .json({ message: "Employee hourly rate updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating employee hourly rate",
        error: error.message,
      });
  }
};

// Delete an Employee Hourly Rate by ID
const deleteEmployeeHourlyRate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EmployeeHourlyRate.destroy({
      where: { employee_id: id },
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Employee hourly rate not found" });
    }
    res
      .status(200)
      .json({ message: "Employee hourly rate deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting employee hourly rate",
        error: error.message,
      });
  }
};

module.exports = {
  createEmployeeHourlyRate,
  getAllEmployeeHourlyRates,
  getEmployeeHourlyRateById,
  updateEmployeeHourlyRate,
  deleteEmployeeHourlyRate,
};
