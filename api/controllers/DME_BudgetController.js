// controllers/DME_BudgetController.js

const DME_Budget = require('../models/DME_Budget');
const DME_Campaign = require('../models/DME_Campaign');
const sequelize = require('../db');

// Create a new budget
const createBudget = async (req, res) => {
  try {
    const {
      CampaignID,
      TotalBudget,
      DailyBudget,
      CurrentSpend,
      Currency,
      UpdatedOn,
    } = req.body;

    const sqlQuery = `
      INSERT INTO DME_Budget (
        CampaignID,
        TotalBudget,
        DailyBudget,
        CurrentSpend,
        Currency,
        UpdatedOn
      ) VALUES (
        :CampaignID,
        :TotalBudget,
        :DailyBudget,
        :CurrentSpend,
        :Currency,
        TRY_CONVERT(DATETIME, :UpdatedOn, 120)
      )`;

    await sequelize.query(sqlQuery, {
      replacements: {
        CampaignID,
        TotalBudget,
        DailyBudget,
        CurrentSpend,
        Currency,
        UpdatedOn,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: 'Budget created successfully',status:1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating budget' });
  }
};


// Get all budgets
const getAllBudgets = async (req, res) => {
  try {
    const budgets = await DME_Budget.findAll({
      include: {
        model: DME_Campaign,  // Include campaign data
        attributes: ['CampaignID', 'CampaignName'],
      },
    });
    res.json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching budgets' });
  }
};

// Get a budget by ID
const getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await DME_Budget.findByPk(id, {
      include: {
        model: DME_Campaign,  // Include campaign data
        attributes: ['CampaignID', 'CampaignName'],
      },
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching budget' });
  }
};

// Update a budget
const updateBudget = async (req, res) => {
  try {
    const { BudgetID } = req.params;
    const {
      CampaignID,
      TotalBudget,
      DailyBudget,
      CurrentSpend,
      Currency,
      UpdatedOn,
    } = req.body;

    const sqlQuery = `
      UPDATE DME_Budget
      SET
        CampaignID = :CampaignID,
        TotalBudget = :TotalBudget,
        DailyBudget = :DailyBudget,
        CurrentSpend = :CurrentSpend,
        Currency = :Currency,
        UpdatedOn = TRY_CONVERT(DATETIME, :UpdatedOn, 120)
      WHERE BudgetID = :BudgetID`;

    const [affectedRows] = await sequelize.query(sqlQuery, {
      replacements: {
        BudgetID,
        CampaignID,
        TotalBudget,
        DailyBudget,
        CurrentSpend,
        Currency,
        UpdatedOn,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget updated successfully',status:1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating budget' });
  }
};


// Delete a budget
const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await DME_Budget.findByPk(id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await budget.destroy();
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting budget' });
  }
};

module.exports = {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
