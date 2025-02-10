const ProjectTasksEmployee = require("../models/Project_Tasks_Employee");
const sequelize = require("../db");
const moment = require("moment");
// Create a new record
const createTaskEmployee = async (req, res) => {
    try {
      const { Task_ID, Employee_ID, Due_Date, Priority, Status, IsClosed } = req.body;
      const formattedDueDate = Due_Date ? Due_Date : null;
  
      const sqlQuery = `
        INSERT INTO Project_Tasks_Employee (
          Task_ID, Employee_ID, Due_Date, Priority, Status, IsClosed
        ) VALUES (
          :Task_ID, :Employee_ID, ${formattedDueDate ? 'TRY_CONVERT(DATETIME, :Due_Date, 120)' : 'NULL'}, :Priority, :Status, :IsClosed
        )`;
  
      await sequelize.query(sqlQuery, {
        replacements: {
          Task_ID,
          Employee_ID,
          Due_Date: formattedDueDate,
          Priority,
          Status,
          IsClosed,
        },
        type: sequelize.QueryTypes.INSERT,
      });
  
      res.status(201).json({
        message: "Task-Employee record created successfully",
        status: 1,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating record" });
    }
  };
  

// Get all records
const getAllTaskEmployees = async (req, res) => {
  try {
    const records = await ProjectTasksEmployee.findAll();
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching records" });
  }
};

// Get a record by Task_ID and Employee_ID
const getTaskEmployeeById = async (req, res) => {
  try {
    const { Task_ID } = req.params;

    const record = await ProjectTasksEmployee.findOne({ where: { Task_ID } });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching record" });
  }
};

// Update a record
const updateTaskEmployee = async (req, res) => {
    try {
      const { Task_ID } = req.params;
      const { Due_Date, Employee_ID, Priority, Status, IsClosed } = req.body;
      // If Due_Date is empty, set it to null
      const formattedDueDate = Due_Date ? Due_Date : null;
  
      const sqlQuery = `
          UPDATE Project_Tasks_Employee
          SET Due_Date = ${formattedDueDate ? `TRY_CONVERT(DATETIME, :Due_Date, 120)` : 'NULL'}, 
              Priority = :Priority,
              Status = :Status,
              IsClosed = :IsClosed,
              Employee_ID = :Employee_ID
          WHERE Task_ID = :Task_ID`; 
  
      const [affectedRows] = await sequelize.query(sqlQuery, {
        replacements: {
          Task_ID,
          Employee_ID,
          Due_Date: formattedDueDate,
          Priority,
          Status,
          IsClosed,
        },
        type: sequelize.QueryTypes.UPDATE,
      });
  
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Record not found" });
      }
  
      res.status(200).json({ message: "Record updated successfully", status: 1 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating record" });
    }
  };
// Delete a record
const deleteTaskEmployee = async (req, res) => {
  try {
    const { Task_ID } = req.params;

    const record = await ProjectTasksEmployee.findOne({ where: { Task_ID } });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    await record.destroy();
    res.json({ message: "Record deleted successfully", status: 1 });
  } catch (error) {
    console.error(error);

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        error: "Unable to delete record",
        message:
          "This record is referenced in other data. Delete the related data first.",
      });
    }

    res.status(500).json({ error: "Error deleting record" });
  }
};

module.exports = {
  createTaskEmployee,
  getAllTaskEmployees,
  getTaskEmployeeById,
  updateTaskEmployee,
  deleteTaskEmployee,
};
