const express = require('express');
const {
  createPerformance,
  getAllPerformance,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
} = require('../controllers/DME_PerformanceController');

const router = express.Router();

router.post('/', createPerformance); 
router.get('/', getAllPerformance); 
router.get('/:id', getPerformanceById); 
router.put('/:PerformanceID', updatePerformance); 
router.delete('/:id', deletePerformance); 

module.exports = router;
