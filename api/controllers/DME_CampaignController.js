const DME_Campaign = require('../models/DME_Campaign');
const sequelize = require('../db');

// Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const {
      CampaignName,
      Platform,
      Objective,
      StartDate,
      EndDate,
      CreatedBy,
      CreatedOn,
      IsActive,
    } = req.body;

    const sqlQuery = `
      INSERT INTO DME_Campaign (
        CampaignName,
        Platform,
        Objective,
        StartDate,
        EndDate,
        CreatedBy,
        CreatedOn,
        IsActive
      ) VALUES (
        :CampaignName,
        :Platform,
        :Objective,
        TRY_CONVERT(DATETIME, :StartDate, 120),
        TRY_CONVERT(DATETIME, :EndDate, 120),
        :CreatedBy,
        TRY_CONVERT(DATETIME, :CreatedOn, 120),
        :IsActive
      )`;

    await sequelize.query(sqlQuery, {
      replacements: {
        CampaignName,
        Platform,
        Objective,
        StartDate,
        EndDate,
        CreatedBy,
        CreatedOn,
        IsActive,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: 'Campaign created successfully',status : 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating campaign' });
  }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await DME_Campaign.findAll();
    res.json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching campaigns' });
  }
};

// Get a campaign by ID
const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await DME_Campaign.findByPk(id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching campaign' });
  }
};

// Update a campaign
const updateCampaign = async (req, res) => {
  try {
    const { CampaignID } = req.params;
    const {
      CampaignName,
      Platform,
      Objective,
      StartDate,
      EndDate,
      CreatedBy,
      CreatedOn,
      IsActive,
    } = req.body;

    const sqlQuery = `
      UPDATE DME_Campaign
      SET
        CampaignName = :CampaignName,
        Platform = :Platform,
        Objective = :Objective,
        StartDate = TRY_CONVERT(DATETIME, :StartDate, 120),
        EndDate = TRY_CONVERT(DATETIME, :EndDate, 120),
        CreatedBy = :CreatedBy,
        CreatedOn = TRY_CONVERT(DATETIME, :CreatedOn, 120),
        IsActive = :IsActive
      WHERE CampaignID = :CampaignID
    `;

    const [affectedRows] = await sequelize.query(sqlQuery, {
      replacements: {
        CampaignID,
        CampaignName,
        Platform,
        Objective,
        StartDate,
        EndDate,
        CreatedBy,
        CreatedOn,
        IsActive,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.status(200).json({ message: 'Campaign updated successfully' , status : 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating campaign' });
  }
};

// Delete a campaign
const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await DME_Campaign.findByPk(id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    await campaign.destroy();
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting campaign' });
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
};
