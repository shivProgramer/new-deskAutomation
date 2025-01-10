const ProjectCostDetail = require("../models/Project_Cost_Details.js");

const { Op, fn, col, where, literal, Sequelize } = require("sequelize");
const moment = require("moment");

// Get a list of all projects
const getProjects = async (req, res) => {
  try {
    const projects = await ProjectCostDetail.findAll({
      attributes: [
        "project_id",
        "project_name",
        "budget",
        "current_cost",
        "is_critical",
        "IsMonthly",
        "actual_cost",
        "start_date",
        "end_date",
        "Paid_amount",
      ],
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectCostDetail.findOne({
      where: { project_id: id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

// Create a new project
async function createProject(req, res) {
  try {
    const {
      project_name,
      budget,
      current_cost,
      actual_cost,
      is_critical,
      project_manager_emails,
    } = req.body;

    const newProject = await ProjectCostDetail.create({
      project_name,
      budget,
      current_cost,
      actual_cost,
      is_critical,
      project_manager_emails,
    });

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Error creating project" });
  }
}



const updateProject = async (req, res) => {
  const { id } = req.params;
  const {
    project_name,
    budget,
    current_cost,
    actual_cost,
    is_critical,
    IsMonthly,
    project_manager_emails,
    start_date,
    end_date,
    Paid_amount,
  } = req.body;

  try {
    const project = await ProjectCostDetail.findOne({
      where: { project_id: id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update only provided fields
    if (project_name !== undefined) project.project_name = project_name;
    if (budget !== undefined) project.budget = budget;
    if (current_cost !== undefined) project.current_cost = current_cost;
    if (actual_cost !== undefined) project.actual_cost = actual_cost;
    if (is_critical !== undefined) project.is_critical = is_critical;
    if (IsMonthly !== undefined) project.IsMonthly = IsMonthly;
    if (project_manager_emails !== undefined)
      project.project_manager_emails = project_manager_emails;

    if (start_date === null) project.start_date = null;
    else if (start_date !== undefined)
      project.start_date = new Date(start_date);

    if (end_date === null) project.end_date = null;
    else if (end_date !== undefined) project.end_date = new Date(end_date);

    if (Paid_amount !== undefined)
      project.Paid_amount = parseFloat(Paid_amount);

    await project.save();
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};

// Delete a project by ID
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectCostDetail.findOne({
      where: { project_id: id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

// Search projects by filters: status, date, stakeholder, or budget
const searchProjects = async (req, res) => {
  try {
    const {
      status,
      start_date,
      end_date,
      stakeholder_email,
      min_budget,
      max_budget,
    } = req.body;

    // Initialize the filter object
    const filters = {};

    // Handle `status` conversion to Boolean
    if (status !== undefined && status !== "") {
      const statusValue = String(status).toLowerCase();
      if (statusValue === "true" || statusValue === "false") {
        filters.is_critical = statusValue === "true";
      } else {
        return res
          .status(400)
          .json({ message: "Invalid status value. Use 'true' or 'false'." });
      }
    }

    // Handle `start_date` filter
    if (start_date) {
      if (moment(start_date, "YYYY-MM-DD", true).isValid()) {
        filters[Op.and] = filters[Op.and] || [];
        filters[Op.and].push(
          Sequelize.where(
            Sequelize.cast(
              Sequelize.col("projectCostDetail.updated_at"),
              "DATE"
            ),
            {
              [Op.gte]: start_date,
            }
          )
        );
      } else {
        return res.status(400).json({ message: "Invalid start date format." });
      }
    }

    // Handle `end_date` filter
    if (end_date) {
      if (moment(end_date, "YYYY-MM-DD", true).isValid()) {
        filters[Op.and] = filters[Op.and] || [];
        filters[Op.and].push(
          Sequelize.where(
            Sequelize.cast(
              Sequelize.col("projectCostDetail.updated_at"),
              "DATE"
            ),
            {
              [Op.lte]: end_date,
            }
          )
        );
      } else {
        return res.status(400).json({ message: "Invalid end date format." });
      }
    }

    // Handle `stakeholder_email` as a Like Search
    if (stakeholder_email && stakeholder_email !== "") {
      filters.project_manager_emails = {
        [Op.like]: `%${stakeholder_email}%`,
      };
    }

    // Handle `min_budget` and `max_budget` as Numbers
    if (min_budget && min_budget !== "") {
      const minBudgetValue = parseFloat(min_budget);
      if (!isNaN(minBudgetValue)) {
        filters.budget = filters.budget || {};
        filters.budget[Op.gte] = minBudgetValue;
      } else {
        return res.status(400).json({ message: "Invalid min_budget value." });
      }
    }

    if (max_budget && max_budget !== "") {
      const maxBudgetValue = parseFloat(max_budget);
      if (!isNaN(maxBudgetValue)) {
        filters.budget = filters.budget || {};
        filters.budget[Op.lte] = maxBudgetValue;
      } else {
        return res.status(400).json({ message: "Invalid max_budget value." });
      }
    }

    // Execute the query with the filters
    const projects = await ProjectCostDetail.findAll({
      where: filters,
    });

    // Return the filtered projects
    res
      .status(200)
      .json({ message: "Projects fetched successfully", projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  searchProjects,
};
