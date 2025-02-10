const express = require("express");
const router = express.Router();
const {
  createTaskEmployee,
  getAllTaskEmployees,
  getTaskEmployeeById,
  updateTaskEmployee,
  deleteTaskEmployee,
} = require("../controllers/projectTasksEmployeeController");

// CRUD Routes
router.post("/", createTaskEmployee);
router.get("/", getAllTaskEmployees);
router.get("/:Task_ID", getTaskEmployeeById);
router.put("/:Task_ID", updateTaskEmployee);
router.delete("/:Task_ID", deleteTaskEmployee);

module.exports = router;
