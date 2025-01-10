const express = require('express');
const router = express.Router();
const {
  createROAS,
  getAllROAS,
  getROASById,
  updateROAS,
  deleteROAS,
} = require('../controllers/DME_ROASController');

// Route to create a new ROAS record
router.post('/', createROAS);

// Route to get all ROAS records
router.get('/', getAllROAS);

// Route to get a ROAS record by ID
router.get('/:id', getROASById);

// Route to update a ROAS record
router.put('/:ROASID', updateROAS);

// Route to delete a ROAS record
router.delete('/:id', deleteROAS);

module.exports = router;
