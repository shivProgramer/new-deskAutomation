const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const AdhocReport = sequelize.define(
  "AdhocReport",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SP: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    },
  },
  {
    tableName: "Adhoc_Report", 
    timestamps: false, 
  }
);

module.exports = AdhocReport;
