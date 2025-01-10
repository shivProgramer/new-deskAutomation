const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const DME_RewardRules = sequelize.define('DME_RewardRules', {
  RuleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  RuleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  MinROAS: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  MinRevenue: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  RewardType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  RewardValue: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: true,
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  CreatedOn: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'DME_RewardRules',
  timestamps: false,
});

module.exports = DME_RewardRules;
