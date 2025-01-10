const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Sales_RewardsSetup = sequelize.define('Sales_RewardsSetup', {
  RewardID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TargetPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  TargetValue: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  RewardValue: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: true,
  },
  RewardDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  RewardType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ValidFrom: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ValidTo: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  CreatedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Sales_RewardsSetup',
  timestamps: false,
});

module.exports = Sales_RewardsSetup;
