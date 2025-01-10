const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Sales_TeamTargets = sequelize.define('Sales_TeamTargets', {
  TargetID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TargetDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  TargetValue: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: true,
  },
  TargetType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  StartDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  EndDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  CreatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'Sales_TeamTargets',
  timestamps: false,
});

module.exports = Sales_TeamTargets;
