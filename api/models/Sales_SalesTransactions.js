const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Employee = require("./Employee"); // Import Employee model for association

const Sales_SalesTransactions = sequelize.define(
  "Sales_SalesTransactions",
  {
    SaleID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    EmployeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employee,
        key: "desk_employee_id",
      },
    },
    SaleDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    SaleValue: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    RewardValue: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    SalesSource: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ProjectName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    AdCampaignName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    DivisionName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Sales_SalesTransactions",
    timestamps: false,
  }
);

// Association with Employee model
Sales_SalesTransactions.belongsTo(Employee, {
  foreignKey: "EmployeeID",
  targetKey: "desk_employee_id",
});

module.exports = Sales_SalesTransactions;
