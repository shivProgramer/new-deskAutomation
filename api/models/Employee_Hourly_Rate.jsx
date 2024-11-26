const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db');

const EmployeeHourlyRate = sequelize.define('EmployeeHourlyRate', {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  employee_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bill_rate: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false, // Rate at which the employee's work is billed
  },
  pay_rate: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false, // Rate at which the employee is paid
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('GETDATE'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('GETDATE'),
  },
}, {
  tableName: 'Employee_Hourly_Rate', // Match the table name in the database
  timestamps: false, // Disable automatic timestamps
});

module.exports = EmployeeHourlyRate;
