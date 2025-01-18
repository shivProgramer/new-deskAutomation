const Holiday = require("../models/Holiday");
const { Op } = require("sequelize");

// Get all holidays
exports.getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.findAll();
    res.status(200).json(holidays);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving holidays", error });
  }
};

// Get a holiday by ID
exports.getHolidayById = async (req, res) => {
  const { id } = req.params;
  try {
    const holiday = await Holiday.findOne({ where: { id } });
    if (holiday) {
      res.status(200).json(holiday);
    } else {
      res.status(404).json({ message: "Holiday not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving holiday", error });
  }
};

// Create a new holiday
exports.createHoliday = async (req, res) => {
  const { holiday_date, description } = req.body;
  try {
    if (!holiday_date || !description) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    const newHoliday = await Holiday.create({ holiday_date, description });
    res.status(201).json({ message: "Holiday created successfully", status: 1 , newHoliday });
  } catch (error) {
    res.status(500).json({ message: "Error creating holiday", error });
  }
};

// Update a holiday
exports.updateHoliday = async (req, res) => {
  const { id } = req.params;
  const { holiday_date, description } = req.body;
  try {
    const holiday = await Holiday.findOne({ where: { id } });
    if (!holiday) {
      return res.status(404).json({ message: "Holiday not found" });
    }
    holiday.holiday_date = holiday_date || holiday.holiday_date;
    holiday.description = description || holiday.description;
    await holiday.save();
    res.status(200).json({ message: "Holiday updated successfully", status: 1  , holiday });
  } catch (error) {
    res.status(500).json({ message: "Error updating holiday", error });
  }
};

// Delete a holiday
exports.deleteHoliday = async (req, res) => {
  const { id } = req.params;
  try {
    const holiday = await Holiday.findOne({ where: { id } });
    if (!holiday) {
      return res.status(404).json({ message: "Holiday not found" });
    }
    await holiday.destroy();
    res.status(200).json({ message: "Holiday deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting holiday", error });
  }
};
