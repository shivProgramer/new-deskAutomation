const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const DME_Analysis = sequelize.define('DME_Analysis', {
  AnalysisID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CampaignID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  AddedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  AddedOn: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'DME_Analysis',
  timestamps: false,
});

module.exports = DME_Analysis;
