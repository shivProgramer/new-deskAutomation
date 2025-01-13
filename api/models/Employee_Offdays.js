const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const EmployeeOffday = sequelize.define(
  "EmployeeOffday",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    desk_employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    off_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    is_covered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    covered_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING(255),
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
    tableName: "Employee_Offdays",
    timestamps: false,
  }
);

module.exports = EmployeeOffday;
