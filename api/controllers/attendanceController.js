

// controllers/EmployeeAttendanceController.js
const EmployeeAttendance = require('../models/Employee_Attendance.jsx');
const { Op } = require('sequelize');
const sequelize = require("../db.js");
// Create new attendance record
const createAttendance = async (req, res) => {
    try {
      const {
        desk_employee_id,
        date,
        arrived,
        left,
        online_time,
        offline_time,
        desktime_time,
        at_work_time,
        after_work_time,
        before_work_time,
        productive_time,
        productivity,
        efficiency,
        work_starts,
        work_ends,
        late,
        is_online
      } = req.body;
  
      // SQL query for creating the attendance record using TRY_CONVERT for date
      const sqlQuery = `
        INSERT INTO Employee_Attendance (
          desk_employee_id, 
          date, 
          arrived, 
          [left],  -- Escaped the reserved keyword 'left'
          online_time, 
          offline_time, 
          desktime_time, 
          at_work_time, 
          after_work_time, 
          before_work_time, 
          productive_time, 
          productivity, 
          efficiency, 
          work_starts, 
          work_ends, 
          late, 
          is_online
        )
        VALUES (
          :desk_employee_id,
          TRY_CONVERT(DATE, :date, 120),
          :arrived,
          :left,
          :online_time,
          :offline_time,
          :desktime_time,
          :at_work_time,
          :after_work_time,
          :before_work_time,
          :productive_time,
          :productivity,
          :efficiency,
          :work_starts,
          :work_ends,
          :late,
          :is_online
        )
      `;
      
      await sequelize.query(sqlQuery, {
        replacements: {
          desk_employee_id,
          date,
          arrived,
          left,  // this should map to the `left` column in the database
          online_time,
          offline_time,
          desktime_time,
          at_work_time,
          after_work_time,
          before_work_time,
          productive_time,
          productivity,
          efficiency,
          work_starts,
          work_ends,
          late,
          is_online
        },
        type: sequelize.QueryTypes.INSERT
      });
  
      res.status(201).json({ message: 'Attendance created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating attendance' });
    }
  };
  
// Update attendance record
const updateAttendance = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        arrived,
        left,  // Escaped reserved keyword 'left'
        online_time,
        offline_time,
        desktime_time,
        at_work_time,
        after_work_time,
        before_work_time,
        productive_time,
        productivity,
        efficiency,
        work_starts,
        work_ends,
        late,
        is_online
      } = req.body;
  
      // SQL query for updating the attendance record using TRY_CONVERT for date
      const sqlQuery = `
        UPDATE Employee_Attendance
        SET 
          arrived = :arrived,
          [left] = :left,  -- Escaped the reserved keyword 'left'
          online_time = :online_time,
          offline_time = :offline_time,
          desktime_time = :desktime_time,
          at_work_time = :at_work_time,
          after_work_time = :after_work_time,
          before_work_time = :before_work_time,
          productive_time = :productive_time,
          productivity = :productivity,
          efficiency = :efficiency,
          work_starts = :work_starts,
          work_ends = :work_ends,
          late = :late,
          is_online = :is_online
        WHERE id = :id
      `;
  
      // Execute the query to update the attendance record
      const result = await sequelize.query(sqlQuery, {
        replacements: {
          id,
          arrived,
          left,  // this should map to the `left` column in the database
          online_time,
          offline_time,
          desktime_time,
          at_work_time,
          after_work_time,
          before_work_time,
          productive_time,
          productivity,
          efficiency,
          work_starts,
          work_ends,
          late,
          is_online
        },
        type: sequelize.QueryTypes.UPDATE
      });
  
      if (result[0] === 0) {
        return res.status(404).json({ message: 'Attendance not found' });
      }
  
      res.json({ message: 'Attendance updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating attendance' });
    }
  };
  

// Get attendance by employee and date
const getAttendance = async (req, res) => {
    try {
      // Fetch all attendance records
      const attendance = await EmployeeAttendance.findAll();
  
      if (attendance.length === 0) {
        return res.status(404).json({ message: 'No attendance records found' });
      }
  
      res.json(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching attendance records' });
    }
  };

// Delete attendance record
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await EmployeeAttendance.findByPk(id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }

    await attendance.destroy();
    res.json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting attendance' });
  }
};

const getAttendanceById = async (req, res) => {
    try {
      const { id } = req.params;  // Get the 'id' from the URL params
  
      // Fetch attendance record by ID
      const attendance = await EmployeeAttendance.findOne({
        where: {
          id: id  // Filter by 'id' from the request
        }
      });
  
      if (!attendance) {
        return res.status(404).json({ message: 'Attendance not found' });
      }
  
      res.json(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching attendance record' });
    }
  };


module.exports = {
  createAttendance,
  updateAttendance,
  getAttendance,
  deleteAttendance,
  getAttendanceById
};
