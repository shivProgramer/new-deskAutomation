const DME_ROAS = require("../models/DME_ROAS");
const DME_Campaign = require("../models/DME_Campaign");
const sequelize = require("../db");

// Create a new ROAS record
const createROAS = async (req, res) => {
  try {
    const { CampaignID, RevenueGenerated, Spend, UpdatedOn } = req.body;

    const sqlQuery = `
        INSERT INTO DME_ROAS (
          CampaignID,
          RevenueGenerated,
          Spend,
          UpdatedOn
        ) VALUES (
          :CampaignID,
          :RevenueGenerated,
          :Spend,
          TRY_CONVERT(DATETIME, :UpdatedOn, 120)
        )`;

    await sequelize.query(sqlQuery, {
      replacements: { CampaignID, RevenueGenerated, Spend, UpdatedOn },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: "ROAS record created successfully",status: 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating ROAS record" });
  }
};



// Get all ROAS records with associated Campaign data
const getAllROAS = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        r.*,
        c.CampaignName
      FROM 
        DME_ROAS r
      LEFT JOIN 
        DME_Campaign c
      ON 
        r.CampaignID = c.CampaignID
    `);

    // Transform the results to include campaign name as an object
    const roasData = results.map((roas) => ({
      ...roas,
      Campaign: {
        Name: roas.CampaignName,
        ID: roas.CampaignID,
      },
    }));

    // Remove redundant fields from the top-level of the object
    roasData.forEach((roas) => {
      delete roas.CampaignName;
    });

    res.json(roasData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching ROAS data" });
  }
};

module.exports = { getAllROAS };

// Get a ROAS record by ID
const getROASById = async (req, res) => {
  try {
    const { id } = req.params;
    const roasRecord = await DME_ROAS.findByPk(id);

    if (!roasRecord) {
      return res.status(404).json({ message: "ROAS record not found" });
    }

    res.json(roasRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching ROAS record" });
  }
};

// Update a ROAS record
const updateROAS = async (req, res) => {
  try {
    const { ROASID } = req.params;
    const { CampaignID, RevenueGenerated, Spend, UpdatedOn } = req.body;

    const sqlQuery = `
        UPDATE DME_ROAS 
        SET
          CampaignID = :CampaignID,
          RevenueGenerated = :RevenueGenerated,
          Spend = :Spend,
          UpdatedOn = TRY_CONVERT(DATETIME, :UpdatedOn, 120)
        WHERE ROASID = :ROASID
      `;

    const [affectedRows] = await sequelize.query(sqlQuery, {
      replacements: { ROASID, CampaignID, RevenueGenerated, Spend, UpdatedOn },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: "ROAS record not found" });
    }

    res.status(200).json({ message: "ROAS record updated successfully" , status: 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating ROAS record" });
  }
};

// Delete a ROAS record
const deleteROAS = async (req, res) => {
  try {
    const { id } = req.params;
    const roasRecord = await DME_ROAS.findByPk(id);

    if (!roasRecord) {
      return res.status(404).json({ message: "ROAS record not found" });
    }

    await roasRecord.destroy();
    res.json({ message: "ROAS record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting ROAS record" });
  }
};

module.exports = {
  createROAS,
  getAllROAS,
  getROASById,
  updateROAS,
  deleteROAS,
};
