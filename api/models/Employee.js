

const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const Employee = sequelize.define(
  "Employee",
  {
    desk_employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false, 
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true, 
      unique: true, 
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    group_name: {
      type: DataTypes.STRING(255),
      allowNull: true, 
    },
    profile_url: {
      type: DataTypes.STRING(500),
      allowNull: true, 
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true, 
      defaultValue: Sequelize.fn("GETDATE"), 
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true, 
      defaultValue: Sequelize.fn("GETDATE"), 
    },
  },
  {
    tableName: "Employees",
    timestamps: false, 
  }
);

module.exports = Employee;

