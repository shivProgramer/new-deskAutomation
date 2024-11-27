

const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db');

const EmployeeHourlyRate = sequelize.define('EmployeeHourlyRate', {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  employee_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bill_rate: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false, 
  },
  pay_rate: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false, 
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('GETDATE()'),  
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('GETDATE()'),  
  },
}, {
  sequelize,
  modelName: 'EmployeeHourlyRate',
  tableName: 'Employee_Hourly_Rate',
  timestamps: false,  
});

module.exports = EmployeeHourlyRate;
