const express = require('express');
const router = express.Router();
const DME_RewardRulesController = require('../controllers/DME_RewardRulesController.js');

// Create a new reward rule
router.post('/', DME_RewardRulesController.createRewardRule);

// Get all reward rules
router.get('/', DME_RewardRulesController.getAllRewardRules);

// Get a specific reward rule by ID
router.get('/:id', DME_RewardRulesController.getRewardRuleById);

// Update a specific reward rule by ID
router.put('/:RuleID', DME_RewardRulesController.updateRewardRule);

// Delete a specific reward rule by ID
router.delete('/:id', DME_RewardRulesController.deleteRewardRule);

module.exports = router;
