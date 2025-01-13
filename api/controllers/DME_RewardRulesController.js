const DME_RewardRules = require('../models/DME_RewardRules.js');
const sequelize = require("../db.js");

// Create a new rule
const createRewardRule = async (req, res) => {
  try {
    const {
      RuleName,
      MinROAS,
      MinRevenue,
      RewardType,
      RewardValue,
      IsActive,
      CreatedOn
    } = req.body;

    const sqlQuery = `
      INSERT INTO DME_RewardRules (
        RuleName,
        MinROAS,
        MinRevenue,
        RewardType,
        RewardValue,
        IsActive,
        CreatedOn
      ) VALUES (
        :RuleName,
        :MinROAS,
        :MinRevenue,
        :RewardType,
        :RewardValue,
        :IsActive,
        TRY_CONVERT(DATETIME, :CreatedOn, 120)
      )`;

    await sequelize.query(sqlQuery, {
      replacements: {
        RuleName,
        MinROAS,
        MinRevenue,
        RewardType,
        RewardValue,
        IsActive,
        CreatedOn
      },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: "Reward rule created successfully" , status:1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating reward rule" });
  }
};

// Get all reward rules
const getAllRewardRules = async (req, res) => {
  try {
    const rules = await DME_RewardRules.findAll();
    res.json(rules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching reward rules' });
  }
};

// Get reward rule by ID
const getRewardRuleById = async (req, res) => {
  try {
    const { id } = req.params;

    const rule = await DME_RewardRules.findByPk(id);

    if (!rule) {
      return res.status(404).json({ message: 'Reward rule not found' });
    }

    res.json(rule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching reward rule' });
  }
};

// Update a reward rule
const updateRewardRule = async (req, res) => {
  try {
    const { RuleID } = req.params;
    const {
      RuleName,
      MinROAS,
      MinRevenue,
      RewardType,
      RewardValue,
      IsActive,
      CreatedOn
    } = req.body;

    const sqlQuery = `
      UPDATE DME_RewardRules
      SET
        RuleName = :RuleName,
        MinROAS = :MinROAS,
        MinRevenue = :MinRevenue,
        RewardType = :RewardType,
        RewardValue = :RewardValue,
        IsActive = :IsActive,
        CreatedOn = TRY_CONVERT(DATETIME, :CreatedOn, 120)
      WHERE RuleID = :RuleID
    `;

    const [affectedRows] = await sequelize.query(sqlQuery, {
      replacements: {
        RuleID,
        RuleName,
        MinROAS,
        MinRevenue,
        RewardType,
        RewardValue,
        IsActive,
        CreatedOn
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Reward rule not found" });
    }

    res.status(200).json({ message: "Reward rule updated successfully" , status:1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating reward rule" });
  }
};

// Delete a reward rule
const deleteRewardRule = async (req, res) => {
  try {
    const { id } = req.params;

    const rule = await DME_RewardRules.findByPk(id);

    if (!rule) {
      return res.status(404).json({ message: 'Reward rule not found' });
    }

    await rule.destroy();
    res.json({ message: 'Reward rule deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting reward rule' });
  }
};

module.exports = {
  createRewardRule,
  getAllRewardRules,
  getRewardRuleById,
  updateRewardRule,
  deleteRewardRule,
};
