const express = require('express');
const {
  createAnalysis,
  getAllAnalysis,
  getAnalysisById,
  updateAnalysis,
  deleteAnalysis,
} = require('../controllers/DME_AnalysisController');

const router = express.Router();

router.post('/', createAnalysis);
router.get('/', getAllAnalysis);
router.get('/:id', getAnalysisById);
router.put('/:id', updateAnalysis);
router.delete('/:id', deleteAnalysis);

module.exports = router;
