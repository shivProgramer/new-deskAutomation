const AdhocReport = require("../models/Adhoc_Report.js");
const sequelize = require("../db.js");
const { Sequelize } = require("sequelize");
// Create a new Adhoc Report
exports.createAdhocReport = async (req, res) => {
  try {
    const { ID, Name, SP, IsActive } = req.body;
    const newReport = await AdhocReport.create({ ID, Name, SP, IsActive });
    res.status(201).json({ message: "Adhoc Report created successfully", data: newReport });
  } catch (error) {
    res.status(500).json({ message: "Error creating Adhoc Report", error: error.message });
  }
};
// Get all Adhoc Reports
exports.getAllAdhocReports = async (req, res) => {
  try {
    const reports = await AdhocReport.findAll();
    res.status(200).json({ message: "Adhoc Reports fetched successfully", data: reports });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Adhoc Reports", error: error.message });
  }
};
// Get a single Adhoc Report by ID
exports.getAdhocReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await AdhocReport.findByPk(id);
    if (report) {
      res.status(200).json({ message: "Adhoc Report fetched successfully", data: report });
    } else {
      res.status(404).json({ message: "Adhoc Report not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching Adhoc Report", error: error.message });
  }
};
// Update an Adhoc Report
exports.updateAdhocReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, SP, IsActive } = req.body;
    const report = await AdhocReport.findByPk(id);
    if (report) {
      report.Name = Name ?? report.Name;
      report.SP = SP ?? report.SP;
      report.IsActive = IsActive ?? report.IsActive;
      await report.save();
      res.status(200).json({ message: "Adhoc Report updated successfully", data: report });
    } else {
      res.status(404).json({ message: "Adhoc Report not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating Adhoc Report", error: error.message });
  }
};
// Delete an Adhoc Report
exports.deleteAdhocReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AdhocReport.destroy({ where: { ID: id } });
    if (deleted) {
      res.status(200).json({ message: "Adhoc Report deleted successfully" });
    } else {
      res.status(404).json({ message: "Adhoc Report not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting Adhoc Report", error: error.message });
  }
};

// Fetch data by calling the stored procedure
exports.executeStoredProcedure = async (req, res) => {
  try {
    const { name } = req.params;

    // Fetch the record with the given name
    const report = await AdhocReport.findOne({ where: { Name: name } });

    if (!report) {
      return res.status(404).json({ message: "Adhoc Report not found" });
    }

    const storedProcedure = report.SP;

    if (!storedProcedure) {
      return res.status(400).json({ message: "No stored procedure defined for this Adhoc Report" });
    }

    // Execute the stored procedure
    const result = await sequelize.query(`EXEC ${storedProcedure}`, {
      type: Sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({ message: "Stored procedure executed successfully", data: result });
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    res.status(500).json({ message: "Error executing stored procedure", error: error.message });
  }
};