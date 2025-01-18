const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const Holiday = sequelize.define(
  "Holiday",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
      allowNull: false,
    },
    holiday_date: {
      type: DataTypes.DATEONLY, 
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("GETDATE"), 
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("GETDATE"), 
    },
  },
  {
    tableName: "Holidays",
    timestamps: true,
    createdAt: "created_at", 
    updatedAt: "updated_at", 
  }
);

module.exports = Holiday;
