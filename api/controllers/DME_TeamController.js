const DME_Team = require('../models/DME_Team');
const Employees = require('../models/Employee');
const DME_Campaign = require('../models/DME_Campaign');
const sequelize = require('../db');
const { allDMETeamDetails } = require('../utils/query');

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

    res.status(201).json({ message: 'Team created successfully',status:1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating team' });
  }
};


const getAllTeams = async (req, res) => {
  try {
    // Using Sequelize's raw query method
    const teams = await sequelize.query(allDMETeamDetails, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Send the result as the response
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Error fetching teams' });
  }
};

// const getAllTeams = async (req, res) => {
//   try {
//     // Query using Sequelize's include
//     const campaignsWithEmployeesAndTeams = await DME_Campaign.findAll({
//       attributes: ['CampaignID', 'CampaignName', 'StartDate'],
//       include: [
//         {
//           model: DME_Team,
//           attributes: ['TeamID', 'AssignedOn'],
//           include: [
//             {
//               model: Employees,
//               attributes: ['EmployeeID', 'EmployeeName'],
//             },
//           ],
//         },
//       ],
//     });

//     // Format the result as per your required structure
//     const result = campaignsWithEmployeesAndTeams.map(campaign => {
//       return {
//         CampaignID: campaign.CampaignID,
//         CampaignName: campaign.CampaignName,
//         StartDate: campaign.StartDate,
//         Employees: campaign.DME_Teams.map(team => {
//           return team.Employees.map(employee => ({
//             EmployeeID: employee.EmployeeID,
//             EmployeeName: employee.EmployeeName,
//             TeamID: team.TeamID,
//             AssignedOn: team.AssignedOn
//           }));
//         }).flat(),
//       };
//     });

//     // Send the formatted data as the response
//     res.json(result);
//   } catch (error) {
//     console.error('Error fetching campaigns with employees and teams:', error);
//     res.status(500).json({
//       error: 'Error fetching campaigns with employees and teams',
//       details: error.message
//     });
//   }
// };


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

    res.status(200).json({ message: 'Team updated successfully', status:1 });
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
