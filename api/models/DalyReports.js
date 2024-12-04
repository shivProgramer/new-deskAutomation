const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const DalyReports = sequelize.define(
  "DalyReports",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Report_Subject: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Report_Type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Email_Code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Script_Path: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    Occurence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LastRanOnTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
    Data_SP: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    Email_Body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DalyReports",
    tableName: "Daily_Reports",
    timestamps: false,
  }
);

module.exports = DalyReports;
