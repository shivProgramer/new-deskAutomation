const Ecomm_project_list = require("../models/Ecomm_project_list");

// Create a new project
const createProject = async (req, res) => {
  try {
    const project = await Ecomm_project_list.create(req.body);
    res.status(201).json({ status: 1, message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Failed to create project", error: error.message });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Ecomm_project_list.findAll();
    res.status(200).json({ status: 1, projects });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Failed to fetch projects", error: error.message });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Ecomm_project_list.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ status: 0, message: "Project not found" });
    }
    res.status(200).json({ status: 1, project });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Failed to fetch project", error: error.message });
  }
};

// Update a project by ID
const updateProject = async (req, res) => {
  try {
    const [updated] = await Ecomm_project_list.update(req.body, {
      where: { project_id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ status: 0, message: "Project not found" });
    }
    const updatedProject = await Ecomm_project_list.findByPk(req.params.id);
    res.status(200).json({ status: 1, message: "Project updated successfully", updatedProject });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Failed to update project", error: error.message });
  }
};

// Delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const deleted = await Ecomm_project_list.destroy({
      where: { project_id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ status: 0, message: "Project not found" });
    }
    res.status(200).json({ status: 1, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Failed to delete project", error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
