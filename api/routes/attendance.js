// const express = require("express");
// const router = express.Router();
// const attendanceController = require("../controllers/attendanceController");
// const { verifyToken } = require("../middleware/authMiddleware");

// // Route for fetching attendance overview
// router.get("/attendance/overview", verifyToken, attendanceController.getAttendanceOverview);
// router.get("/attendance/emp/:id", verifyToken, attendanceController.getAttendanceListForSingleEmp);

// router.post("/attendance/checkin/:desk_employee_id/:project_id", verifyToken, attendanceController.checkIn);
// router.post("/attendance/checkout/:desk_employee_id", verifyToken, attendanceController.checkOut);
// router.put("/attendance/update/:id", verifyToken, attendanceController.updateAttendance);
// router.post("/attendance/filter", verifyToken, attendanceController.filterAttendance);



const express = require('express');
const router = express.Router();
const EmployeeAttendanceController = require('../controllers/attendanceController');

// Create attendance
router.post('/attendance', EmployeeAttendanceController.createAttendance);

// Get attendance by employee and date
router.get('/attendance', EmployeeAttendanceController.getAttendance);

// get by id 
router.get('/attendance/:id', EmployeeAttendanceController.getAttendanceById);
// Update attendance by ID
router.put('/attendance/:id', EmployeeAttendanceController.updateAttendance);


// Delete attendance by ID
router.delete('/attendance/:id', EmployeeAttendanceController.deleteAttendance);

module.exports = router;
