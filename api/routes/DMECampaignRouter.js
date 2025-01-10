const express = require('express');
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} = require('../controllers/DME_CampaignController');

const router = express.Router();

// Route to create a new campaign
router.post('/', createCampaign);

// Route to get all campaigns
router.get('/', getAllCampaigns);

// Route to get a campaign by ID
router.get('/:id', getCampaignById);

// Route to update a campaign by ID
router.put('/:CampaignID', updateCampaign);

// Route to delete a campaign by ID
router.delete('/:id', deleteCampaign);

module.exports = router;
