const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const DME_ROAS = sequelize.define(
  'DME_ROAS',
  {
    ROASID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CampaignID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'DME_Campaign', 
        key: 'CampaignID',
      },
      allowNull: false,
    },
    RevenueGenerated: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Spend: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ROAS: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    UpdatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'DME_ROAS',
    timestamps: false,
  }
);

module.exports = DME_ROAS;
