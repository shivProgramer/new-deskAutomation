const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Ecomm_project_reporting = sequelize.define(
  "Ecomm_project_reporting",
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,   
      allowNull: false,   
    },
    last_date_reported: {
      type: DataTypes.DATEONLY,  
      allowNull: true,           
    },
    report_sent_by_name: {
      type: DataTypes.STRING(100),  
      allowNull: true,            
    },
    report_sent_by_type: {
      type: DataTypes.STRING(50),   
      allowNull: true,            
    },
    employee_id: {
      type: DataTypes.INTEGER,    
      allowNull: true,           
    },
  },
  {
    sequelize,
    modelName: "Ecomm_project_reporting",  
    tableName: "ecomm_project_reporting", 
    timestamps: false,     
  }
);

module.exports = Ecomm_project_reporting;
