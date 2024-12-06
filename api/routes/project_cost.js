

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController.js');  
const { verifyToken } = require('../middleware/authMiddleware'); 
// Get all projects
router.get('/projects/search', verifyToken, projectController.searchProjects)
router.get('/projects', verifyToken, projectController.getProjects);
// Get a single project by ID
router.get('/projects/getByid/:id', verifyToken, projectController.getProjectById);
// Create a new project
router.post('/projects', verifyToken, projectController.createProject);
// Update an existing project by ID
router.put('/projects/:id', verifyToken, projectController.updateProject);
// Delete a project by ID
router.delete('/projects/:id', verifyToken, projectController.deleteProject);
// for search  
module.exports = router;