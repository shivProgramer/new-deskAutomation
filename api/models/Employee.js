
// const { DataTypes, Sequelize } = require("sequelize");
// const sequelize = require("../db");

// const Employee = sequelize.define(
//   "Employee",
//   {
//     desk_employee_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,  // This allows manual insertion of desk_employee_id
//     },
//     name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//       unique: true,
//     },
//     group_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     group_name: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     profile_url: {
//       type: DataTypes.STRING(500),
//       allowNull: true,
//     },
//     is_online: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//     },
//     arrived: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     left: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     late: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//     },
//     online_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     offline_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     desktime_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     at_work_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     after_work_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     before_work_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     productive_time: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     productivity: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
//     efficiency: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
//     work_starts: {
//       type: DataTypes.TIME,
//       allowNull: true,
//     },
//     work_ends: {
//       type: DataTypes.TIME,
//       allowNull: true,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.fn("GETDATE"),
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       allowNull: true,
//       defaultValue: Sequelize.fn("GETDATE"),
//     },
//   },
//   {
//     tableName: "Employees",
//     timestamps: false, // Disable automatic timestamps
//   }
// );

// module.exports = Employee;


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

