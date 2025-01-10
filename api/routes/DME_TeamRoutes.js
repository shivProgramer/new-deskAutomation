const express = require('express');
const router = express.Router();
const DME_TeamController = require('../controllers/DME_TeamController');

// Create a new team
router.post('/', DME_TeamController.createTeam);

// Get all teams
router.get('/', DME_TeamController.getAllTeams);

// Get a team by ID
router.get('/:id', DME_TeamController.getTeamById);

// Update a team
router.put('/:TeamID', DME_TeamController.updateTeam);

// Delete a team
router.delete('/:id', DME_TeamController.deleteTeam);

module.exports = router;
