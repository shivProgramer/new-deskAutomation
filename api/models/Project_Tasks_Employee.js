const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const ProjectTasksEmployee = sequelize.define(
  "Project_Tasks_Employee",
  {
    Task_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Employee_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Due_Date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Priority: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    IsClosed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "Project_Tasks_Employee",
    timestamps: false,
  }
);

module.exports = ProjectTasksEmployee;
