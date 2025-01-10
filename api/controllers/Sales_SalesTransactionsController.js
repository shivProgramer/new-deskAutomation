const Sales_SalesTransactions = require("../models/Sales_SalesTransactions");
const sequelize = require("../db");

// Create a new sales transaction
const createSalesTransaction = async (req, res) => {
  try {
    const {
      EmployeeID,
      SaleDate,
      SaleValue,
      RewardValue,
      SalesSource,
      ProjectName,
      AdCampaignName,
      DivisionName,
      CreatedAt,
    } = req.body;
    // Ensure SaleDate and CreatedAt are valid dates before proceeding
    if (!SaleDate || !CreatedAt) {
      return res
        .status(400)
        .json({ error: "SaleDate and CreatedAt are required" });
    }
    // Prepare the SQL query
    const sqlQuery = `
      INSERT INTO Sales_SalesTransactions (
        EmployeeID,
        SaleDate,
        SaleValue,
        RewardValue,
        SalesSource,
        ProjectName,
        AdCampaignName,
        DivisionName,
        CreatedAt
      ) VALUES (
        :EmployeeID,
        :SaleDate,
        :SaleValue,
        :RewardValue,
        :SalesSource,
        :ProjectName,
        :AdCampaignName,
        :DivisionName,
        TRY_CONVERT(DATETIME, :CreatedAt, 120)
      );
      SELECT * FROM Sales_SalesTransactions WHERE SaleID = SCOPE_IDENTITY();
    `;

    // Execute the query and fetch inserted data
    const result = await sequelize.query(sqlQuery, {
      replacements: {
        EmployeeID,
        SaleDate,
        SaleValue,
        RewardValue,
        SalesSource,
        ProjectName,
        AdCampaignName,
        DivisionName,
        CreatedAt,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    console.log("Inserted Row Data: ", result);

    // Return the inserted row data
    res.status(201).json({
      message: "Sales transaction created successfully",
      result: result[0],
      status: 1,
    });
  } catch (error) {
    console.error("Error creating sales transaction: ", error);
    res.status(500).json({ error: "Error creating sales transaction" });
  }
};

// Get all sales transactions
const getAllSalesTransactions = async (req, res) => {
  try {
    const transactions = await Sales_SalesTransactions.findAll({
      include: ["Employee"], // Include associated Employee data
    });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching sales transactions" });
  }
};

// Get a sales transaction by ID
const getSalesTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Sales_SalesTransactions.findByPk(id, {
      include: ["Employee"],
    });

    if (!transaction) {
      return res.status(404).json({ message: "Sales transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching sales transaction" });
  }
};

// Update a sales transaction
const updateSalesTransaction = async (req, res) => {
  try {
    console.log("Request Body ----", req.body);

    const {
      SaleID,
      EmployeeID,
      SaleDate,
      SaleValue,
      RewardValue,
      SalesSource,
      ProjectName,
      AdCampaignName,
      DivisionName,
      CreatedAt,
    } = req.body;

    // Ensure SaleID is provided
    if (!SaleID) {
      return res.status(400).json({ error: "SaleID is required" });
    }

    // Prepare the SQL query
    const sqlQuery = `
      UPDATE Sales_SalesTransactions
      SET
        EmployeeID = :EmployeeID,
        SaleDate = :SaleDate,
        SaleValue = :SaleValue,
        RewardValue = :RewardValue,
        SalesSource = :SalesSource,
        ProjectName = :ProjectName,
        AdCampaignName = :AdCampaignName,
        DivisionName = :DivisionName,
        CreatedAt = TRY_CONVERT(DATETIME, :CreatedAt, 120)
      WHERE SaleID = :SaleID;

      -- Fetch the updated record after update
      SELECT * FROM Sales_SalesTransactions WHERE SaleID = :SaleID;
    `;

    // Execute the query
    const result = await sequelize.query(sqlQuery, {
      replacements: {
        SaleID,
        EmployeeID,
        SaleDate,
        SaleValue,
        RewardValue,
        SalesSource,
        ProjectName,
        AdCampaignName,
        DivisionName,
        CreatedAt,
      },
      type: sequelize.QueryTypes.SELECT, // Use SELECT type to get results after update
    });

    if (result.length === 0) {
      return res.status(404).json({ error: "Sales transaction not found" });
    }

    console.log("Updated Row Data: ", result);

    // Return the updated row data
    res.status(200).json({
      message: "Sales transaction updated successfully",
      result: result[0],
      status: 1,
    });
  } catch (error) {
    console.error("Error updating sales transaction: ", error);
    res.status(500).json({ error: "Error updating sales transaction" });
  }
};

// Delete a sales transaction
const deleteSalesTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Sales_SalesTransactions.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ message: "Sales transaction not found" });
    }

    await transaction.destroy();
    res.json({ message: "Sales transaction deleted successfully", status: 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting sales transaction" });
  }
};

module.exports = {
  createSalesTransaction,
  getAllSalesTransactions,
  getSalesTransactionById,
  updateSalesTransaction,
  deleteSalesTransaction,
};
