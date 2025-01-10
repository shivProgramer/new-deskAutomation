// routes/DME_BudgetRoutes.js

const express = require('express');
const router = express.Router();
const DME_BudgetController = require('../controllers/DME_BudgetController');

// Create a new budget
router.post('/', DME_BudgetController.createBudget);

// Get all budgets
router.get('/', DME_BudgetController.getAllBudgets);

// Get a budget by ID
router.get('/:id', DME_BudgetController.getBudgetById);

// Update a budget
router.put('/:BudgetID', DME_BudgetController.updateBudget);

// Delete a budget
router.delete('/:id', DME_BudgetController.deleteBudget);

module.exports = router;
