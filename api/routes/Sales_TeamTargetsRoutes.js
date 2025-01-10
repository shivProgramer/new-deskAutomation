const express = require('express');
const router = express.Router();
const salesTeamTargetsController = require('../controllers/Sales_TeamTargetsController');

// Create a new sales target
router.post('/', salesTeamTargetsController.createSalesTarget);

// Get all sales targets
router.get('/', salesTeamTargetsController.getAllSalesTargets);

// Get a sales target by ID
router.get('/:id', salesTeamTargetsController.getSalesTargetById);

// Update a sales target
router.put('/:id', salesTeamTargetsController.updateSalesTarget);

// Delete a sales target
router.delete('/:id', salesTeamTargetsController.deleteSalesTarget);

module.exports = router;
