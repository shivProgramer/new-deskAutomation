


const express = require('express');
const router = express.Router();
const EmployeeAttendanceController = require('../controllers/attendanceController');
const { verifyToken } = require('../middleware/authMiddleware');

// Create attendance
router.post('/attendance', verifyToken, EmployeeAttendanceController.createAttendance);

// Get attendance by employee and date
router.get('/attendance',verifyToken, EmployeeAttendanceController.getAttendance);

// get by id 
router.get('/attendance/:id',verifyToken, EmployeeAttendanceController.getAttendanceById);
// Update attendance by ID
router.put('/attendance/:id',verifyToken, EmployeeAttendanceController.updateAttendance);


// Delete attendance by ID
router.delete('/attendance/:id',verifyToken, EmployeeAttendanceController.deleteAttendance);

module.exports = router;
