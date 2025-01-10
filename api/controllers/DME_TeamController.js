const DME_Team = require('../models/DME_Team');
const sequelize = require('../db');

// Create a new team
const createTeam = async (req, res) => {
  try {
    const { CampaignID, EmployeeID, Role, AssignedOn } = req.body;

    const sqlQuery = `
      INSERT INTO DME_Team (
        CampaignID,
        EmployeeID,
        Role,
        AssignedOn
      ) VALUES (
        :CampaignID,
        :EmployeeID,
        :Role,
        TRY_CONVERT(DATETIME, :AssignedOn, 120)
      )`;

    await sequelize.query(sqlQuery, {
      replacements: { CampaignID, EmployeeID, Role, AssignedOn },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: 'Team created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating team' });
  }
};

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await DME_Team.findAll();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching teams' });
  }
};

// Get a team by ID
const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await DME_Team.findByPk(id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching team' });
  }
};

// Update a team
const updateTeam = async (req, res) => {
  try {
    const { TeamID } = req.params;
    const { CampaignID, EmployeeID, Role, AssignedOn } = req.body;

    const sqlQuery = `
      UPDATE DME_Team
      SET
        CampaignID = :CampaignID,
        EmployeeID = :EmployeeID,
        Role = :Role,
        AssignedOn = TRY_CONVERT(DATETIME, :AssignedOn, 120)
      WHERE TeamID = :TeamID`;

    const [affectedRows] = await sequelize.query(sqlQuery, {
      replacements: { TeamID, CampaignID, EmployeeID, Role, AssignedOn },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json({ message: 'Team updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating team' });
  }
};

// Delete a team
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await DME_Team.findByPk(id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    await team.destroy();
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting team' });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
