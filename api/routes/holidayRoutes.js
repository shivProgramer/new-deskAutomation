const express = require("express");
const {
  getAllHolidays,
  getHolidayById,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} = require("../controllers/holidayController");

const router = express.Router();

router.get("/", getAllHolidays); 
router.get("/:id", getHolidayById); 
router.post("/", createHoliday); 
router.put("/:id", updateHoliday); 
router.delete("/:id", deleteHoliday);

module.exports = router;
