const Sales_RewardsSetup = require('../models/Sales_RewardsSetup.js');
const sequelize = require("../db.js");

// Create a new record
const createSalesReward = async (req, res) => {
  try {
    const {
      TargetPercentage,
      TargetValue,
      RewardValue,
      RewardDescription,
      RewardType,
      ValidFrom,
      ValidTo,
      CreatedBy,
      CreatedAt,
    } = req.body;
    const sqlQuery = `
      INSERT INTO Sales_RewardsSetup (
        TargetPercentage,
        TargetValue,
        RewardValue,
        RewardDescription,
        RewardType,
        ValidFrom,
        ValidTo,
        CreatedBy,
        CreatedAt
      ) VALUES (
        :TargetPercentage,
        :TargetValue,
        :RewardValue,
        :RewardDescription,
        :RewardType,
        TRY_CONVERT(DATETIME, :ValidFrom, 120),
        TRY_CONVERT(DATETIME, :ValidTo, 120),
        :CreatedBy,
        TRY_CONVERT(DATETIME, :CreatedAt, 120)
      )`;

    await sequelize.query(sqlQuery, {
      replacements: {
        TargetPercentage,
        TargetValue,
        RewardValue,
        RewardDescription,
        RewardType,
        ValidFrom,
        ValidTo,
        CreatedBy,
        CreatedAt
      },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: "Sales reward created successfully",  status: 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating sales reward" ,  status: 0, });
  }
};

// Get all records
const getAllSalesRewards = async (req, res) => {
  try {
    const rewards = await Sales_RewardsSetup.findAll();
    res.json(rewards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching sales rewards' });
  }
};

// Get a record by ID
const getSalesRewardById = async (req, res) => {
  try {
    const { id } = req.params;

    const reward = await Sales_RewardsSetup.findByPk(id);

    if (!reward) {
      return res.status(404).json({ message: 'Sales reward not found' });
    }

    res.json(reward);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching sales reward' });
  }
};

// Update a record
const updateSalesReward = async (req, res) => {
    try {
      const { RewardID } = req.params; // Get the RewardID from the URL parameters
      const {
        TargetPercentage,
        TargetValue,
        RewardValue,
        RewardDescription,
        RewardType,
        ValidFrom,
        ValidTo,
        CreatedBy,
        CreatedAt,
      } = req.body;
  
      // SQL query for updating the sales reward record
      const sqlQuery = `
        UPDATE Sales_RewardsSetup
        SET
          TargetPercentage = :TargetPercentage,
          TargetValue = :TargetValue,
          RewardValue = :RewardValue,
          RewardDescription = :RewardDescription,
          RewardType = :RewardType,
          ValidFrom = TRY_CONVERT(DATETIME, :ValidFrom, 120),
          ValidTo = TRY_CONVERT(DATETIME, :ValidTo, 120),
          CreatedBy = :CreatedBy,
          CreatedAt = TRY_CONVERT(DATETIME, :CreatedAt, 120)
        WHERE RewardID = :RewardID
      `;
  
      // Execute the query with replacements
      const [affectedRows] = await sequelize.query(sqlQuery, {
        replacements: {
          RewardID,
          TargetPercentage,
          TargetValue,
          RewardValue,
          RewardDescription,
          RewardType,
          ValidFrom,
          ValidTo,
          CreatedBy,
          CreatedAt,
        },
        type: sequelize.QueryTypes.UPDATE,
      });
  
      // Check if any rows were updated
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Sales reward not found" });
      }
  
      res.status(200).json({ message: "Sales reward updated successfully" ,  status: 1, });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating sales reward" ,  status: 0, });
    }
  };
  
// Delete a record
const deleteSalesReward = async (req, res) => {
  try {
    const { id } = req.params;

    const reward = await Sales_RewardsSetup.findByPk(id);

    if (!reward) {
      return res.status(404).json({ message: 'Sales reward not found' });
    }

    await reward.destroy();
    res.json({ message: 'Sales reward deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting sales reward' });
  }
};

module.exports = {
  createSalesReward,
  getAllSalesRewards,
  getSalesRewardById,
  updateSalesReward,
  deleteSalesReward,
};
