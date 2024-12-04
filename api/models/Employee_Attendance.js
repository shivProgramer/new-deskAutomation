

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const EmployeeAttendance = sequelize.define('EmployeeAttendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  desk_employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  arrived: {
    type: DataTypes.DATE,
    allowNull: true
  },
  left: {
    type: DataTypes.DATE,
    allowNull: true
  },
  online_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  offline_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  desktime_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  at_work_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  after_work_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  before_work_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  productive_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  productivity: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  efficiency: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  work_starts: {
    type: DataTypes.TIME,
    allowNull: true
  },
  work_ends: {
    type: DataTypes.TIME,
    allowNull: true
  },
  late: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  is_online: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Employee_Attendance',
  timestamps: false
});

module.exports = EmployeeAttendance;
