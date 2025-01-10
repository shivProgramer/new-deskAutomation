const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const DME_Campaign = require('./DME_Campaign');

const DME_Performance = sequelize.define(
  'DME_Performance',
  {
    PerformanceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CampaignID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DME_Campaign,
        key: 'CampaignID',
      },
    },
    Impressions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Clicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Conversions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    CTR: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ConversionRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    UpdatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'DME_Performance',
    timestamps: false,
  }
);

module.exports = DME_Performance;
