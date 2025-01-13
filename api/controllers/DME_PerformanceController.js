const DME_Performance = require("../models/DME_Performance");
const DME_Campaign = require("../models/DME_Campaign");
const sequelize = require("../db");

// Get all performance entries

const getAllPerformance = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        p.*,
        c.CampaignName
      FROM 
        DME_Performance p
      LEFT JOIN 
        DME_Campaign c
      ON 
        p.CampaignID = c.CampaignID
    `);

    // Transform the results to include campaign name as an object
    const performanceData = results.map((performance) => ({
      ...performance,
      Campaign: {
        Name: performance.CampaignName,
        ID: performance.CampaignID,
      },
    }));

    // Remove redundant fields from the top-level of the object
    performanceData.forEach((performance) => {
      delete performance.CampaignName;
    });

    res.json(performanceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching performance data" });
  }
};

// Create a new performance entry
const createPerformance = async (req, res) => {
  try {
    const { CampaignID, Impressions, Clicks, Conversions, UpdatedOn } =
      req.body;

    const sqlQuery = `
        INSERT INTO DME_Performance (
          CampaignID,
          Impressions,
          Clicks,
          Conversions,
          UpdatedOn
        ) VALUES (
          :CampaignID,
          :Impressions,
          :Clicks,
          :Conversions,
          TRY_CONVERT(DATETIME, :UpdatedOn, 120)
        )`;

    await sequelize.query(sqlQuery, {
      replacements: {
        CampaignID,
        Impressions,
        Clicks,
        Conversions,
        UpdatedOn,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: "Performance entry created successfully", status : 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating performance entry" });
  }
};

// Get performance by ID
const getPerformanceById = async (req, res) => {
  try {
    const { id } = req.params;

    const performance = await DME_Performance.findByPk(id);

    if (!performance) {
      return res.status(404).json({ message: "Performance data not found" });
    }

    res.json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching performance data" });
  }
};

// Update performance
const updatePerformance = async (req, res) => {
  try {
    const { PerformanceID } = req.params; // ID of the record to update
    const { CampaignID, Impressions, Clicks, Conversions, UpdatedOn } =
      req.body;

    const sqlQuery = `
        UPDATE DME_Performance
        SET
          CampaignID = :CampaignID,
          Impressions = :Impressions,
          Clicks = :Clicks,
          Conversions = :Conversions,
          UpdatedOn = TRY_CONVERT(DATETIME, :UpdatedOn, 120)
        WHERE PerformanceID = :PerformanceID
      `;

    const [affectedRows] = await sequelize.query(sqlQuery, {
      replacements: {
        CampaignID,
        Impressions,
        Clicks,
        Conversions,
        UpdatedOn,
        PerformanceID,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Performance entry not found" });
    }

    res.status(200).json({ message: "Performance entry updated successfully" , status : 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating performance entry" });
  }
};

// Delete performance
const deletePerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const performance = await DME_Performance.findByPk(id);

    if (!performance) {
      return res.status(404).json({ message: "Performance data not found" });
    }

    await performance.destroy();
    res.json({ message: "Performance deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting performance" });
  }
};

module.exports = {
  createPerformance,
  getAllPerformance,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
};
