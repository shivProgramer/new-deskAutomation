const express = require('express');
const router = express.Router();
const {
  createSalesReward,
  getAllSalesRewards,
  getSalesRewardById,
  updateSalesReward,
  deleteSalesReward
} = require('../controllers/Sales_RewardsSetupController');

// Create a new sales reward
router.post('/', createSalesReward);

// Get all sales rewards
router.get('/', getAllSalesRewards);

// Get a sales reward by ID
router.get('/:id', getSalesRewardById);

// Update a sales reward
router.put('/:RewardID', updateSalesReward);

// Delete a sales reward
router.delete('/:id', deleteSalesReward);

module.exports = router;
