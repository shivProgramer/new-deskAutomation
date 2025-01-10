// models/DME_Budget.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const DME_Campaign = require('./DME_Campaign');  

const DME_Budget = sequelize.define(
  'DME_Budget',
  {
    BudgetID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CampaignID: {
      type: DataTypes.INTEGER,
      references: {
        model: DME_Campaign,
        key: 'CampaignID',
      },
      allowNull: false,
    },
    TotalBudget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    DailyBudget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    CurrentSpend: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    RemainingBudget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UpdatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'DME_Budget',
    timestamps: false,
  }
);

// Define the relationship
DME_Budget.belongsTo(DME_Campaign, { foreignKey: 'CampaignID' });

module.exports = DME_Budget;
