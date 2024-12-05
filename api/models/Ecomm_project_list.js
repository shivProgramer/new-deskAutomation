// const { DataTypes } = require("sequelize");
// const sequelize = require("../db");

// const Ecomm_project_list = sequelize.define(
//   "Ecomm_project_list",
//   {
//     project_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING(100),
//       allowNull: true, // `Checked` implies the column can be NULL
//     },
//     email_code: {
//       type: DataTypes.INTEGER,
//       allowNull: true, // `Checked` implies the column can be NULL
//     },
//     is_active: {
//       type: DataTypes.BOOLEAN, // Maps `bit` type in MSSQL
//       allowNull: true,
//       defaultValue: true, // Assuming `is_active` default is true
//     },
//     account_manager_name: {
//       type: DataTypes.STRING(100),
//       allowNull: true,
//     },
//     account_manager_email: {
//       type: DataTypes.STRING(100),
//       allowNull: true,
//     },
//     employee_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//     modelName: "Ecomm_project_list",
//     tableName: "ecomm_project_list", 
//     timestamps: false, 
//   }
// );

// module.exports = Project;



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
  },
  {
    sequelize,
    modelName: "Ecomm_project_list",
    tableName: "ecomm_project_list",
    timestamps: false,
  }
);

module.exports = Ecomm_project_list;

