const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../db");
class ProjectCostDetail extends Model {}
ProjectCostDetail.init(
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false, 
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    budget: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    current_cost: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    actual_cost: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    is_critical: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    IsMonthly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Max_Allowed_Time_Overall: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Max_Allowed_Time_Per_Month: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    project_manager_emails: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    Paid_amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true, 
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('GETDATE'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('GETDATE'),
    },
  },
  {
    sequelize,
    modelName: 'ProjectCostDetail',
    tableName: 'Project_Cost_Details',
    timestamps: false,
  }
);

module.exports = ProjectCostDetail;
