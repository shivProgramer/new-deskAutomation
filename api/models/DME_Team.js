const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const DME_Team = sequelize.define(
  'DME_Team',
  {
    TeamID: {
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
    EmployeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AssignedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'DME_Team',
    timestamps: false,
  }
);

module.exports = DME_Team;
