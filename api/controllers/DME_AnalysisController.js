const DME_Analysis = require('../models/DME_Analysis');
const sequelize = require("../db.js");
// Create a new record
const createAnalysis = async (req, res) => {
    try {
      const { CampaignID, Note, AddedBy, AddedOn } = req.body;
  
      // SQL query for creating an analysis record
      const sqlQuery = `
        INSERT INTO DME_Analysis (
          CampaignID,
          Note,
          AddedBy,
          AddedOn
        )
        VALUES (
          :CampaignID,
          :Note,
          :AddedBy,
          TRY_CONVERT(DATETIME, :AddedOn, 120)
        )
      `;
  
      await sequelize.query(sqlQuery, {
        replacements: { CampaignID, Note, AddedBy, AddedOn },
        type: sequelize.QueryTypes.INSERT,
      });
  
      res.status(201).json({ message: "Analysis record created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating analysis record" });
    }
  };
  
// Get all records
const getAllAnalysis = async (req, res) => {
  try {
    const analyses = await DME_Analysis.findAll();
    res.json(analyses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching analysis records' });
  }
};

// Get a record by ID
const getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;

    const analysis = await DME_Analysis.findByPk(id);

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis record not found' });
    }

    res.json(analysis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching analysis record' });
  }
};

// Update a record
const updateAnalysis = async (req, res) => {
    try {
      const { id } = req.params; // Get the analysis ID from the URL parameters
      const { CampaignID, Note, AddedBy, AddedOn } = req.body;
  
      // Check if the analysis exists
      const analysis = await DME_Analysis.findByPk(id);
  
      if (!analysis) {
        return res.status(404).json({ message: 'Analysis record not found' });
      }
  
      // Prepare the SQL query for updating the analysis record
      const sqlQuery = `
        UPDATE DME_Analysis
        SET
          CampaignID = :CampaignID,
          Note = :Note,
          AddedBy = :AddedBy,
          AddedOn = TRY_CONVERT(DATETIME, :AddedOn, 120)
        WHERE
          AnalysisID = :id
      `;
  
      // Execute the update query
      await sequelize.query(sqlQuery, {
        replacements: {
          id,
          CampaignID,
          Note,
          AddedBy,
          AddedOn,
        },
        type: sequelize.QueryTypes.UPDATE,
      });
  
      res.status(200).json({ message: "Analysis record updated successfully" });
    } catch (error) {
      console.error("Error updating analysis:", error);
      res.status(500).json({ error: "Error updating analysis record" });
    }
  };
  

// Delete a record
const deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    const analysis = await DME_Analysis.findByPk(id);

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis record not found' });
    }

    await analysis.destroy();
    res.json({ message: 'Analysis record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting analysis record' });
  }
};

module.exports = {
  createAnalysis,
  getAllAnalysis,
  getAnalysisById,
  updateAnalysis,
  deleteAnalysis,
};
