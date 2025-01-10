const Sales_TeamTargets = require("../models/Sales_TeamTargets");
const sequelize = require("../db");

// Create a new sales target
const createSalesTarget = async (req, res) => {
  try {
    const {
      TargetDescription,
      TargetValue,
      TargetType,
      StartDate,
      EndDate,
      CreatedBy,
      CreatedAt,
      employee_id,
    } = req.body;

    const sqlQuery = `
      INSERT INTO Sales_TeamTargets (
        TargetDescription,
        TargetValue,
        TargetType,
        StartDate,
        EndDate,
        CreatedBy,
        CreatedAt,
        employee_id
      ) VALUES (
        :TargetDescription,
        :TargetValue,
        :TargetType,
        :StartDate,
        :EndDate,
        :CreatedBy,
        TRY_CONVERT(DATETIME, :CreatedAt, 120),
        :employee_id
      )`;

    await sequelize.query(sqlQuery, {
      replacements: {
        TargetDescription,
        TargetValue,
        TargetType,
        StartDate,
        EndDate,
        CreatedBy,
        CreatedAt,
        employee_id,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: "Sales target created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating sales target" });
  }
};

// Get all sales targets
const getAllSalesTargets = async (req, res) => {
  try {
    const targets = await Sales_TeamTargets.findAll();
    res.json(targets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching sales targets" });
  }
};

// Get a sales target by ID
const getSalesTargetById = async (req, res) => {
  try {
    const { id } = req.params;
    const target = await Sales_TeamTargets.findByPk(id);

    if (!target) {
      return res.status(404).json({ message: "Sales target not found" });
    }

    res.json(target);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching sales target" });
  }
};

// Update a sales target
const updateSalesTarget = async (req, res) => {
    try {
      const { id } = req.params; // Extract the TargetID from the URL
      const {
        TargetDescription,
        TargetValue,
        TargetType,
        StartDate,
        EndDate,
        CreatedBy,
        CreatedAt,
        employee_id,
      } = req.body;
  
      const sqlQuery = `
        UPDATE Sales_TeamTargets
        SET
          TargetDescription = :TargetDescription,
          TargetValue = :TargetValue,
          TargetType = :TargetType,
          StartDate = :StartDate,
          EndDate = :EndDate,
          CreatedBy = :CreatedBy,
          CreatedAt = TRY_CONVERT(DATETIME, :CreatedAt, 120),
          employee_id = :employee_id
        WHERE TargetID = :id
      `;
  
      await sequelize.query(sqlQuery, {
        replacements: {
          TargetDescription,
          TargetValue,
          TargetType,
          StartDate,
          EndDate,
          CreatedBy,
          CreatedAt,
          employee_id,
          id, // Pass the TargetID to identify the record to update
        },
        type: sequelize.QueryTypes.UPDATE,
      });
  
      res.status(200).json({ message: "Sales target updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating sales target" });
    }
  };
  
  

// Delete a sales target
const deleteSalesTarget = async (req, res) => {
  try {
    const { id } = req.params;

    const target = await Sales_TeamTargets.findByPk(id);

    if (!target) {
      return res.status(404).json({ message: "Sales target not found" });
    }

    await target.destroy();
    res.json({ message: "Sales target deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting sales target" });
  }
};

module.exports = {
  createSalesTarget,
  getAllSalesTargets,
  getSalesTargetById,
  updateSalesTarget,
  deleteSalesTarget,
};
