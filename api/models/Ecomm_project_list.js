
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Ecomm_project_list = sequelize.define(
  "Ecomm_project_list",
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    account_manager_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    account_manager_email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    last_date_reported: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue("last_date_reported");
      },
    },
  },
  {
    sequelize,
    modelName: "Ecomm_project_list",
    tableName: "ecomm_project_list",
    timestamps: false,
  }
);

module.exports = Ecomm_project_list;

