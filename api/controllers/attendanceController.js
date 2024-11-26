// const { Op } = require("sequelize");
// const EmployeeAttendance = require("../models/Employee_Attendance.jsx");
// const Employee = require("../models/Employee");
// const Project_Cost_Details = require("../models/Project_Cost_Details");
// const moment = require("moment");
// const sequelize = require("../db.js");

// // Controller for Attendance Overview
// exports.getAttendanceOverview = async (req, res) => {
//   try {
//     const { startDate, endDate, employeeId } = req.query;
//     const whereConditions = {
//       isDeleted: false,
//     };
//     if (employeeId) {
//       whereConditions.desk_employee_id = employeeId;
//     }
//     if (startDate && endDate) {
//       whereConditions.date = {
//         [Op.between]: [
//           moment(startDate, "YYYY-MM-DD").startOf("day").toDate(),
//           moment(endDate, "YYYY-MM-DD").endOf("day").toDate(),
//         ],
//       };
//     }
//     // Fetch attendance data
//     const attendanceData = await EmployeeAttendance.findAll({
//       where: whereConditions,
//       include: [
//         {
//           model: Employee,
//           as: "employee", 
//           attributes: ["name"],
//         },
//       ],
//       include: [
//         {
//           model: Project_Cost_Details,
//           as: "projectcostdetails", 
//           attributes: ["project_name","budget","current_cost","actual_cost"],
//         },
//       ],
//       order: [["date", "DESC"]],
//     });

//     return res.status(200).json({ attendanceData });
//   } catch (err) {
//     console.error("Error fetching attendance overview", err);
//     return res.status(500).json({ error: "Failed to fetch attendance overview" });
//   }
// };

// exports.getAttendanceListForSingleEmp = async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Fetch attendance records for the given employee
//     const attendanceData = await EmployeeAttendance.findAll({
//       where: {
//         desk_employee_id: id
//       },
//       include: [
//         {
//           model: Employee,
//           as: "employee", 
//           attributes: ["name"], 
//         },
//       ],
//       include: [
//         {
//           model: Project_Cost_Details,
//           as: "projectcostdetails", 
//           attributes: ["project_name","budget","current_cost","actual_cost"],
//         },
//       ],
//       order: [["date", "DESC"]],
//     });

//     // If no attendance data found for the employee
//     if (!attendanceData || attendanceData.length === 0) {
//       return res.status(404).json({ message: "No attendance records found for this employee." });
//     }

//     // Return the attendance data
//     return res.status(200).json({ attendanceData });
//   } catch (error) {
//     console.error("Error fetching attendance data:", error);
//     return res.status(500).json({ message: "Error fetching attendance data", error: error.message });
//   }
// };

// exports.checkIn = async (req, res) => {
//   try {
//     const { desk_employee_id } = req.params;
//     const { project_id } = req.params;
//     const currentTime = moment();
//     if (!desk_employee_id) {
//       return res.status(400).json({ message: "Employee ID is required." });
//     }

//     const arrived = currentTime.utc().format("YYYY-MM-DD HH:mm:ss"); 
//     const work_starts = currentTime.utc().format("HH:mm:ss");
//     const is_online = true;

//     const sqlQuery = `
//       INSERT INTO Employee_Attendance (desk_employee_id, date, arrived, work_starts, is_online,project_id)
//       VALUES (
//         :desk_employee_id,
//         TRY_CONVERT(DATE, :date, 120),
//         TRY_CONVERT(DATETIME, :arrived, 120),
//         TRY_CONVERT(TIME, :work_starts, 108),
//         :is_online,
//         :project_id
//       )
//     `;

//     await sequelize.query(sqlQuery, {
//       replacements: {
//         desk_employee_id,
//         date: currentTime.utc().format("YYYY-MM-DD"),
//         arrived,
//         work_starts,
//         is_online,
//         project_id
//       },
//     });

//     return res.status(201).json({ message: "Check-in successful" });
//   } catch (error) {
//     console.error("Error during check-in:", error);
//     return res.status(500).json({ message: "Error during check-in", error: error.message });
//   }
// };


// exports.checkOut = async (req, res) => {
//   try {
//     const { desk_employee_id } = req.params;
//     const currentTime = moment.utc();
//     if (!desk_employee_id) {  
//       return res.status(400).json({ message: "Employee ID is required." });
//     }
//     const attendanceRecord = await EmployeeAttendance.findOne({
//       where: {
//         desk_employee_id,
//         date: currentTime.format("YYYY-MM-DD"), 
//         isDeleted: false,
//       },
//       order: [["created_at", "DESC"]],
//     });

//     if (!attendanceRecord) {
//       return res.status(404).json({ error: "No attendance record found for today" });
//     }

//     const checkInTime = moment.utc(attendanceRecord.arrived); // Parse with UTC

//     if (!checkInTime.isValid()) {
//       return res.status(500).json({ error: "Check-in time is invalid or missing." });
//     }

//     if (checkInTime.isAfter(currentTime)) {
//       return res.status(400).json({ error: "Check-in time cannot be in the future." });
//     }

//     const desktimeSeconds = currentTime.diff(checkInTime, "seconds");

//     if (desktimeSeconds < 0) {
//       return res.status(400).json({ error: "Invalid desk time. Please check the check-in time." });
//     }

//     const work_ends = currentTime.format("HH:mm:ss");

//     const sqlQuery = `
//       UPDATE Employee_Attendance
//       SET
//         [left] = TRY_CONVERT(DATETIME, :left, 120),
//         work_ends = TRY_CONVERT(TIME, :work_ends, 108),
//         desktime_time = TRY_CONVERT(INT, :desktime_time, 0),
//         is_online = 0,
//         online_time = TRY_CONVERT(INT, :online_time, 0),
//         offline_time = TRY_CONVERT(INT, :offline_time, 0)
//       WHERE id = :id
//     `;

//     await sequelize.query(sqlQuery, {
//       replacements: {
//         id: attendanceRecord.id,
//         left: currentTime.format("YYYY-MM-DD HH:mm:ss"),
//         work_ends,
//         desktime_time: desktimeSeconds,
//         online_time: attendanceRecord.online_time || 0,
//         offline_time: attendanceRecord.offline_time || 0,
//       },
//     });

//     return res.status(200).json({
//       message: "Check-out successful",
//       data: {
//         desk_employee_id,
//         desktime_time: desktimeSeconds,
//       },
//     });
//   } catch (err) {
//     console.error("Error during check-out:", err);
//     return res.status(500).json({ error: "Failed to check-out", message: err.message });
//   }
// };

// exports.updateAttendance = async (req, res) => {
//   try {
//     const { id } = req.params; 
//     const {
//       arrived,
//       left,
//       work_starts,
//       work_ends,
//       online_time,
//       offline_time,
//       desktime_time,
//       productivity,
//       efficiency,
//       is_online,
//     } = req.body; 

//     if (!id) {
//       return res.status(400).json({ message: "Attendance ID is required." });
//     }

//     // Find the record to ensure it exists
//     const attendanceRecord = await EmployeeAttendance.findOne({
//       where: { id, isDeleted: false },
//     });

//     if (!attendanceRecord) {
//       return res.status(404).json({ message: "Attendance record not found." });
//     }

//     // Build SQL query for updates
//     const sqlQuery = `
//       UPDATE Employee_Attendance
//       SET
//         arrived = CASE WHEN :arrived IS NOT NULL THEN TRY_CONVERT(DATETIME, :arrived, 120) ELSE arrived END,
//         [left] = CASE WHEN :left IS NOT NULL THEN TRY_CONVERT(DATETIME, :left, 120) ELSE [left] END,
//         work_starts = CASE WHEN :work_starts IS NOT NULL THEN TRY_CONVERT(TIME, :work_starts, 108) ELSE work_starts END,
//         work_ends = CASE WHEN :work_ends IS NOT NULL THEN TRY_CONVERT(TIME, :work_ends, 108) ELSE work_ends END,
//         online_time = CASE WHEN :online_time IS NOT NULL THEN TRY_CONVERT(INT, :online_time, 0) ELSE online_time END,
//         offline_time = CASE WHEN :offline_time IS NOT NULL THEN TRY_CONVERT(INT, :offline_time, 0) ELSE offline_time END,
//         desktime_time = CASE WHEN :desktime_time IS NOT NULL THEN TRY_CONVERT(INT, :desktime_time, 0) ELSE desktime_time END,
//         productivity = CASE WHEN :productivity IS NOT NULL THEN TRY_CONVERT(FLOAT, :productivity, 0) ELSE productivity END,
//         efficiency = CASE WHEN :efficiency IS NOT NULL THEN TRY_CONVERT(FLOAT, :efficiency, 0) ELSE efficiency END,
//         is_online = CASE WHEN :is_online IS NOT NULL THEN TRY_CONVERT(BIT, :is_online, 0) ELSE is_online END
//       WHERE id = :id
//     `;

//     // Execute the query
//     await sequelize.query(sqlQuery, {
//       replacements: {
//         id,
//         arrived: arrived || null,
//         left: left || null,
//         work_starts: work_starts || null,
//         work_ends: work_ends || null,
//         online_time: online_time !== undefined ? online_time : null,
//         offline_time: offline_time !== undefined ? offline_time : null,
//         desktime_time: desktime_time !== undefined ? desktime_time : null,
//         productivity: productivity !== undefined ? productivity : null,
//         efficiency: efficiency !== undefined ? efficiency : null,
//         is_online: is_online !== undefined ? (is_online ? 1 : 0) : null,
//       },
//     });

//     return res.status(200).json({ message: "Attendance record updated successfully." });
//   } catch (error) {
//     console.error("Error during attendance update:", error);
//     return res.status(500).json({ message: "Error during update", error: error.message });
//   }
// };


// exports.filterAttendance = async (req, res) => {
//   try {
//     const { employeeId, startDate, endDate } = req.body;

//     // Build the query filters
//     const whereClause = { isDeleted: false };

//     // Filter by employee ID if provided
//     if (employeeId) {
//       whereClause.desk_employee_id = employeeId;
//     }

//     // Filter by date range if provided
//     if (startDate && endDate) {
//       whereClause.date = { [Op.between]: [startDate, endDate] };
//     } else if (startDate) {
//       whereClause.date = { [Op.gte]: startDate };
//     } else if (endDate) {
//       whereClause.date = { [Op.lte]: endDate };
//     }

    
//     // Fetch filtered attendance records
//     const attendanceRecords = await EmployeeAttendance.findAll({
//       where: whereClause,
//       include: [
//         {
//           model: Employee,
//           as: "employee",
//           attributes: ["desk_employee_id", "name"],
//         },
//       ],
//     });

//     return res.status(200).json({
//       message: "Attendance records fetched successfully.",
//       data: attendanceRecords,
//     });
//   } catch (error) {
//     console.error("Error filtering attendance records:", error);
//     return res.status(500).json({
//       message: "Error filtering attendance records.",
//       error: error.message,
//     });
//   }
// };


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
