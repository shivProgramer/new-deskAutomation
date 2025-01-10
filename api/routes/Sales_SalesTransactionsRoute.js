const express = require("express");
const router = express.Router();
const {
  createSalesTransaction,
  getAllSalesTransactions,
  getSalesTransactionById,
  updateSalesTransaction,
  deleteSalesTransaction,
} = require("../controllers/Sales_SalesTransactionsController");

router.post("/", createSalesTransaction); // Create a new sales transaction
router.get("/", getAllSalesTransactions); // Get all sales transactions
router.get("/:id", getSalesTransactionById); // Get a sales transaction by ID
router.put("/:id", updateSalesTransaction); // Update a sales transaction by ID
router.delete("/:id", deleteSalesTransaction); // Delete a sales transaction by ID

module.exports = router;
