const Ecomm_project_list = require("../models/Ecomm_project_list");
const Ecomm_project_reporting = require("../models/Ecomm_project_reporting");

const sequelize = require("../db");

const getAllProjects = async (req, res) => {
  try {
    const projects = await sequelize.query(
      "EXEC SP_ecomm_project_list_GetStatus",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      status: 1,
      message: "Projects retrieved successfully",
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to retrieve projects",
      error: error.message,
    });
  }
};

const toggleProjectStatus = async (req, res) => {
  const { project_id } = req.params;

  try {
    const project = await Ecomm_project_list.findOne({
      where: { project_id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updatedStatus = !project.is_active;
    await project.update({ is_active: updatedStatus });

    return res.status(200).json({
      message: `Project status updated to ${
        updatedStatus ? "Active" : "Inactive"
      }`,
      project: project,
    });
  } catch (error) {
    console.error("Error updating project status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sendReport = async (req, res) => {
  try {
    const {
      project_id,
      last_date_reported,
      report_sent_by_name = "admin",
      report_sent_by_type = "email",
      employee_id,
    } = req.body;

    const empId = employee_id || 0;

    const project = await Ecomm_project_list.findOne({
      where: { project_id: project_id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const report = await Ecomm_project_reporting.create({
      project_id,
      last_date_reported,
      report_sent_by_name,
      report_sent_by_type,
      employee_id: empId,
    });

    return res.status(201).json({
      message: "Report sent successfully",
      report,
    });
  } catch (error) {
    console.error("Error sending report:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProjects,
  toggleProjectStatus,
  sendReport,
};
