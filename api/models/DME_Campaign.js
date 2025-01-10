const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const DME_Campaign = sequelize.define(
  'DME_Campaign',
  {
    CampaignID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CampaignName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Objective: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'DME_Campaign',
    timestamps: false,
  }
);

module.exports = DME_Campaign;
